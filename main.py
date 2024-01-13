from fastapi import FastAPI, HTTPException, Depends, status

from jose import JWTError, jwt

from pydantic import BaseModel

from datetime import datetime, timedelta
from sqlalchemy import create_engine, Boolean, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from helpers import generate_unique_id
from typing import List

# FastAPI app instance
app = FastAPI()

# Secret key to sign JWT tokens
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# SQLAlchemy models
SQLALCHEMY_DATABASE_URL = "sqlite:///./RealChats.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",
        "http://localhost:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount('/ui', StaticFiles(directory="ui", html=True), name="dist")


# Database definitions
class UserModel(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String, )
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ChatModel(Base):
    __tablename__ = "chats"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, default='')
    members = Column(String, default='')
    created_by = Column(String, default='')
    is_group = Column(Boolean, default=False)
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


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserSession(BaseModel):
    username: str
    id: str


# front end hosting
@app.get('/', tags=["UI"])
def render_vue_app():
    """
    Render Vue App.

    :param full_path:
    :return:
    """
    # Local Path to index.html
    return FileResponse("ui/index.html", media_type='text/html')


# Re-usable functions
def create_group(db, name, members, is_group, creator):
    db_chat = ChatModel(
        id=generate_unique_id(),
        name=name,
        members=members,
        is_group=is_group,
        created_by=creator
    )
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return str(db_chat)


def create_jwt_token(data: dict):
    to_encode = data.copy()
    expires = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expires})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        id: str = payload.get("id")
        admin = payload.get("admin")
        if username is None:
            raise credentials_exception
        token_data = {"username": username, "id": id, "admin": admin}
    except JWTError:
        raise credentials_exception
    return token_data


# Authentications

@app.post("/token/", response_model=None)
async def login_for_access_token(username: str = '', password: str = '', db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()
    if db_user and password == db_user.password:
        token_data = {"username": username, "id": db_user.id, "admin": db_user.is_admin}
        return {"access_token": create_jwt_token(token_data), "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")


# User related APIs

@app.post("/api/user/create/", response_model=None)
async def create_user(username: str = '', password: str = '', db: Session = Depends(get_db)):
    db_user = UserModel(
        id=generate_unique_id(),
        username=username,
        password=password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    user_id = db_user.id
    db_users = db.query(UserModel).filter(UserModel.id != user_id)
    for user in db_users:
        members = user.id + ' ' + user_id
        chat_id = create_group(db=db, name='', members=members, is_group=False, creator='')
        print(chat_id)
        print(user.id, user_id)

    return str(user_id)


@app.patch("/api/user/{user_id}/update/", response_model=None)
async def update_user(user_id: str, username: str = '', password: str = '', db: Session = Depends(get_db),
                      current_user: UserSession = Depends(get_current_user)):
    if not current_user.get('admin'):
        return {'status': False, 'message': 'No permission available'}
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    db_user.name = username if username != '' else db_user.username
    db_user.password = password if password != '' else db_user.password
    db.commit()
    db.refresh(db_user)
    return {'status': True, 'message': user_id + ' Updated'}


@app.delete("/api/user/{user_id}/delete/", response_model=None)
async def delete_user(user_id: str, db: Session = Depends(get_db),
                      current_user: UserSession = Depends(get_current_user)):
    if not current_user.get('admin'):
        return {'status': False, 'message': 'No permission available'}
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first().delete()
    db.commit()
    db.flush(db_user)
    return {'status': True, 'message': user_id + ' Deleted'}


@app.get("/api/user/view/", response_model=List[UserSession])
async def get_users(db: Session = Depends(get_db)):
    db_user = db.query(UserModel).all()
    return db_user


@app.get("/api/user/me/", response_model=None)
async def get_user(current_user: UserSession = Depends(get_current_user)):
    return current_user


# ------------------------------------------------------------------------


@app.post("/api/chat/create/", response_model=None)
async def create_chat(name: str = '', members: str = '', db: Session = Depends(get_db),
                      current_user: UserSession = Depends(get_current_user)):
    if current_user.get('id') in members:
        chat_id = create_group(db=db, name=name, members=members, is_group=True, creator=current_user.get('id'))
        return {'status': True, 'message': chat_id + ' created'}
    else:
        return {'status': False, 'message': 'you are not part of the chat'}


@app.patch("/api/chat/{chat_id}/update/", response_model=None)
async def update_chat(chat_id: str, name: str = '', members: str = '', db: Session = Depends(get_db),
                      current_user: UserSession = Depends(get_current_user)):
    db_chat = db.query(ChatModel).filter(ChatModel.id == chat_id).first()
    if current_user.get('id') in db_chat.members:
        db_chat.name = name if name != '' else db_chat.name
        db_chat.members = members if members != '' else db_chat.members
        db.commit()
        db.refresh(db_chat)
        return {'status': True, 'message': chat_id + ' updated'}
    else:
        return {'status': False, 'message': 'you are not part of the chat'}


@app.delete("/api/chat/{chat_id}/delete/", response_model=None)
async def delete_chat(chat_id: str, db: Session = Depends(get_db),
                      current_user: UserSession = Depends(get_current_user)):
    db_chat = db.query(ChatModel).filter(ChatModel.id == chat_id).first().delete()
    if current_user.get('id') == db_chat.created_by:
        db_chat.delete()
        db.commit()
        db.flush(db_chat)
        return {'status': True, 'message': db_chat.id + ' updated'}
    else:
        return {'status': False, 'message': 'you are not a owner to delete'}


@app.get("/api/chat/view/", response_model=None)
async def get_chats(db: Session = Depends(get_db), current_user: UserSession = Depends(get_current_user)):
    member = current_user.get('id')
    chats = [x for x in db.query(ChatModel).all() if member in x.members]
    return chats


# --------------------------------#


@app.post("/api/message/send/", response_model=None)
async def create_message(content: str = '', chat: str = '', db: Session = Depends(get_db),
                         current_user: UserSession = Depends(get_current_user)):
    db_msg = MessageModel(
        content=content,
        chat=chat,
        sender=current_user.get('id')
    )
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return str(db_msg)


@app.get("/api/message/receive/", response_model=None)
async def get_messages(chat='', db: Session = Depends(get_db)):
    if chat == '':
        return []
    messages = db.query(MessageModel).filter(MessageModel.chat == chat).order_by(MessageModel.id.desc()).limit(
        10).all()[::-1]
    return messages
