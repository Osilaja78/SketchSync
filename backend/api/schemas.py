from pydantic import BaseModel, EmailStr
from typing import List

class Users(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_password: str

    class Config():
        from_attributes = True
