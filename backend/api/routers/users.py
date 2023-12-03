from fastapi import APIRouter, HTTPException, status, Depends
from api.utils.hashing import password_hash
from sqlalchemy.orm import Session
# from sqlalchemy import exc
from api.database import get_db
from api.utils.email import send_mail
from jose import jwt
from api import models
from dotenv import load_dotenv
from api import schemas
from api.routers.auth import get_current_user
from uuid import uuid4
import os


router = APIRouter(tags=['User'])

load_dotenv()
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')


@router.get('/user')
async def all_users(db: Session = Depends(get_db)):
    """
    Get all users from the database.

    Return:
        list of all users.
    """

    users = db.query(models.User).all()

    return users


@router.post('/user')
async def add_user(request: schemas.Users, db: Session = Depends(get_db)):
    """
    Route for user registration.

    Parameters:
        user schema: contains all necessary input for user details.
    
    Return:
        user: basic user data.
        sucess if registration is successful, else raises an exception.
    """

    if request.password == request.confirm_password: # if password is same as confirm password
        try:
            user = models.User(
                        id=str(uuid4()),
                        first_name=request.first_name,
                        last_name=request.last_name,
                        email=request.email,
                        password=password_hash(request.password)
                    )
            # Add and commit to database.
            db.add(user)
            db.commit()
            db.refresh(user)
            db.close()
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with email already exist!",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Confirm password does not match!"
        )

    # Orchestrate email confirmation token.
    token_data = {
        "sub": request.email
    }
    token = jwt.encode(token_data, JWT_SECRET_KEY, algorithm=ALGORITHM)

    url = f"http://localhost:3000/auth/verify_token?token={token}"

    # Email content for successfule registration
    content = f"""
            <html>
            <body>
                <b>Hi {user.first_name}</b></br>
                <p>
                    Welcome to <b>SketchSync</b>, Transform Ideas into Reality — Together, Anytime, Anywhere
                     thanks for being part of the community 🥰.
                </p>
                <p>
                    Now that you're registered, the next thing is to verify your 
                    email address for you to have access to the system.
                </p>
                <p>
                    Click <a href="{url}">here</a> to verify your account, or follow this link {url}
                </p>
        
            </body>
            </html>
        """

    await send_mail(email=request.email, content=content)

    return {
        "user": user,
        "message": "Success! Please check your email to confirm your account."
    }


@router.get('/user/')
async def get_user(id: str = None, db: Session = Depends(get_db),
                   user: schemas.Users = Depends(get_current_user)):
    """
    Get a specific user from the database using their user id.

    Parameters:
        id: user id to search for.

    Return:
        user: basic user details.
    """

    if id:
        user = db.query(models.User).filter(models.User.id == id).first()

    # Raise an exception if user with enetered id does not exist
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User not found")

    return user
