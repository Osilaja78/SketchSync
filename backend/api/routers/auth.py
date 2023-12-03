# This module contains all necessary authentication
# routes and logic.

from fastapi import APIRouter, HTTPException,status, Depends
from api.utils.hashing import verify_password
from api.utils.token import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from api.database import get_db
from datetime import timedelta
from jose import jwt, JWTError, ExpiredSignatureError
from api import models
from dotenv import load_dotenv
import os


router = APIRouter(tags=['Auth'])

oauth2_scheme = OAuth2PasswordBearer(
        tokenUrl='/auth/login',
        scheme_name="JWT"
    )

password_exception = HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Email or password incorrect!"
            )

load_dotenv()
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')


@router.post('/auth/login')
async def login(request: OAuth2PasswordRequestForm = Depends(), 
                db: Session = Depends(get_db)):
    """
    Route for user login.

    Return:
        user: if user exists, user data.
        access_token: authentication token for user.
    """

    user = db.query(models.User).filter(
        models.User.email == request.username
    ).first()

    # If user or password does not exist, return an error
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User with email does not exist!"
        )

    # Verify the user's password
    password = verify_password(request.password, user.password)

    if not password:
        raise password_exception

    # Check if their account is verified, if not, they cannot login
    if user.is_verified == False:
        return {
            "message": "Please verify your account before logging in!"
        }

    # Generate an access token for the user
    access_token_expires = timedelta(minutes=float(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"user": user, "access_token": access_token}


# Route for account verification
# it verifies users access token sent via email.
@router.get('/auth/verify-token')
async def verify_token(token, db: Session = Depends(get_db)):
    """
    User account verification, verifies users
    access token sent via email.

    Parameters:
        token: token to be verified.
    
    Return:
        message: success upon successful verification, else
        raises an error.
    """

    # Create a payload and decode the token recieved from the user
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token {e}",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Get user email from the payload
    user_email =  payload.get("sub")

    user = db.query(models.User).filter(models.User.email == user_email).first()
    
    # Check if the user exists, if not, return an error
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User does not exist!"
        )
    
    # Change the users verification status to True
    if not user.is_verified:
        user.is_verified = True
        db.commit()
        db.close()

    return {
        "message": "Account verified successfully!"
    }


def get_current_user(token: str = Depends(oauth2_scheme),
                        db: Session = Depends(get_db)) -> models.User:
    """
    Validates user's access token to determine 
    if they can access protected routes.

    Parameters:
        token: user token.
    
    Return:
        user: basic user details upon success, else raises an exception.
    """

    # Exception to be raised if the token or user is not valid
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Decode the access token to see if it is valid
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            options={"verify_aud": False},
        )
        # Get user email from the payload
        user_email: str = payload.get("sub")
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="token has been expired")
    except JWTError:
        raise credentials_exception

    # Validate if the user actually exists in the database
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user!"
        )

    return user
