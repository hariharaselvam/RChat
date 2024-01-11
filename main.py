from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional
from typing import List
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Boolean, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from helpers import generate_unique_id
# FastAPI app instance
app = FastAPI()

# Secret key to sign JWT tokens
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# SQLAlchemy models
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)





class UserCreate(BaseModel):
    username: str
    full_name: str
    email: str
    password: str


# class User(UserCreate):
#     id: int
#     is_active: bool
#     is_admin: bool
#
#     class Config:
#         orm_mode = True


class ChatModel(Base):
    __tablename__ = "chats"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, default='')
    members = Column(String, default='')
    last_update = Column(DateTime, default=datetime.utcnow)

class MessageModel(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    sender = Column(String)
    chat = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Security
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
#
# # Token functions
# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt
#
# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
#
# # Authenticate user
# def authenticate_user(db: Session, username: str, password: str):
#     user = db.query(UserModel).filter(UserModel.username == username).first()
#     if not user or not pwd_context.verify(password, user.hashed_password):
#         return False
#     return user
#
# # Create an access token for the user
# def create_user_access_token(user: UserModel):
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return access_token
#
# # Authenticate admin user
# def is_admin_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = payload
#     except JWTError:
#         raise credentials_exception
#     if token_data.get("is_admin") != True:
#         raise HTTPException(status_code=403, detail="Not enough permissions")
#     return token_data
#
# # API to get a token
# @app.post("/token")
# async def login_for_access_token(
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db),
# ):
#     user = authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     if not user.is_active:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     access_token = create_user_access_token(user)
#     return {"access_token": access_token, "token_type": "bearer"}
#
# # API to create a user (admin only)
# @app.post("/users/", response_model=UserModel)
# async def create_user(
#     user: UserCreate,
#     db: Session = Depends(get_db),
#     current_user: dict = Depends(is_admin_user),
# ):
#     db_user = UserModel(**user.dict())
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
#
# @app.get("/users/", response_model=List[UserModel])
# def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     users = db.query(UserModel).offset(skip).limit(limit).all()
#     return users
#
# @app.get("/chats/", response_model=List[UserModel])
# def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     users = db.query(UserModel).offset(skip).limit(limit).all()
#     return users
#
# @app.get('/hello')
# async def sample_api():
#     db = next(get_db())
#     hashed_password = pwd_context.hash('admin')
#     db_user = UserModel(
#         username='admin',
#         full_name='admin',
#         email='admin',
#         hashed_password=hashed_password,
#         is_active=True,
#         is_admin=True,  # Set as admin
#     )
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
#
# @app.post("/admin/create/", response_model=UserModel)
# async def create_admin_user(user: UserCreate, db: Session = Depends(get_db)):
#
#     # Create the admin user
#     hashed_password = pwd_context.hash(user.password)
#     db_user = UserModel(
#         username=user.username,
#         full_name=user.full_name,
#         email=user.email,
#         hashed_password=hashed_password,
#         is_active=True,
#         is_admin=True,  # Set as admin
#     )
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
#
#
# # API to enable/disable user by ID (admin only)
# @app.put("/users/{user_id}/status/", response_model=UserModel)
# async def toggle_user_status(
#     user_id: int,
#     enabled: bool,
#     db: Session = Depends(get_db),
#     current_user: dict = Depends(is_admin_user),
# ):
#     user = db.query(UserModel).filter(UserModel.id == user_id).first()
#     if user:
#         user.is_active = enabled
#         db.commit()
#         db.refresh(user)
#         return user
#     raise HTTPException(status_code=404, detail="User not found")
#
# # API to delete user by ID (admin only)
# @app.delete("/users/{user_id}/", response_model=UserModel)
# async def delete_user(
#     user_id: int,
#     db: Session = Depends(get_db),
#     current_user: dict = Depends(is_admin_user),
# ):
#     user = db.query(UserModel).filter(UserModel.id == user_id).first()
#     if user:
#         db.delete(user)
#         db.commit()
#         return user
#     raise HTTPException(status_code=404, detail="User not found")

# ------------------------------------------------------------------------




@app.post("/chat/create/", response_model=None)
async def create_group(name:str = '', members:str ='', db: Session = Depends(get_db)):

    db_chat = ChatModel(
        id = generate_unique_id(),
        name=name,
        members=members
    )
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return str(db_chat)

@app.patch("/chat/{chat_id}/update/", response_model=None)
async def create_group(chat_id:str, name:str = '', members:str ='', db: Session = Depends(get_db)):
    db_chat = db.query(ChatModel).filter(ChatModel.id == chat_id).first()
    db_chat.name = name if name!= '' else db_chat.name
    db_chat.members = members if members != '' else db_chat.members
    db.commit()
    db.refresh(db_chat)
    return str(db_chat)

@app.delete("/chat/{chat_id}/delete/", response_model=None)
async def create_group(chat_id:str, db: Session = Depends(get_db)):
    db_chat = db.query(ChatModel).filter(ChatModel.id == chat_id).first().delete()
    db.commit()
    db.flush(db_chat)
    return str(db_chat)

@app.get("/chat/view/", response_model=None)
async def get_chats(member='', db: Session = Depends(get_db)):
    chats = db.query(ChatModel).filter(ChatModel.members.like(f"%{member}%")).all()
    return chats


#--------------------------------#




@app.post("/message/send/", response_model=None)
async def create_message(content:str = '', chat:str ='', sender: str = '', db: Session = Depends(get_db)):

    db_msg = MessageModel(
        content=content,
        chat=chat,
        sender=sender
    )
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return str(db_msg)

@app.get("/message/receive/", response_model=None)
async def get_messages(chat='', db: Session = Depends(get_db)):
    messages = db.query(MessageModel).filter(chat=chat).all()
    return messages