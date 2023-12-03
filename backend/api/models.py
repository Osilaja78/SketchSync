# This module contains all database models.

from sqlalchemy import Column ,String, Boolean
from .database import Base


class User(Base):
    """Model for storing user information."""

    __tablename__ = "User"

    id = Column(String(80), primary_key=True, index=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(50), unique=True)
    password = Column(String(150))
    is_verified = Column(Boolean, default=False)
