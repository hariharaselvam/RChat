from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Temporary in-memory storage
users_db = []
fake_passwords_db = {}  # Temporary passwords storage

class User(BaseModel):
    username: str
    email: str
    is_admin: bool = False

class UserInDB(User):
    hashed_password: str

# Authentication
def fake_hash_password(password: str):
    return "fakehashed" + password

def verify_password(plain_password: str, hashed_password: str):
    return plain_password == hashed_password

def get_user(username: str):
    for user in users_db:
        if user.username == username:
            return user
    return None

# Authenticate User
async def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, fake_passwords_db.get(username)):
        return False
    return user

# Dependency for getting the current user
async def get_current_user(username: str = Depends(authenticate_user)):
    return username

# Middleware for authentication
async def check_authentication(user: User = Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Middleware for admin authorization
async def check_admin(user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not have sufficient privileges",
        )

# Routes

@app.post("/login/")
async def login(username: str, password: str):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"username": user.username, "email": user.email}

@app.post("/logout/")
async def logout():
    return {"message": "Logged out"}

@app.post("/users/add/", dependencies=[Depends(check_admin)])
async def add_user(user: User, password: str):
    hashed_password = fake_hash_password(password)
    user_data = UserInDB(**user.dict(), hashed_password=hashed_password)
    users_db.append(user_data)
    fake_passwords_db[user.username] = hashed_password
    return {"message": "User added successfully"}

@app.delete("/users/delete/", dependencies=[Depends(check_admin)])
async def delete_user(username: str):
    for index, user in enumerate(users_db):
        if user.username == username:
            del users_db[index]
            del fake_passwords_db[username]
            return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/users/", response_model=List[User], dependencies=[Depends(check_authentication)])
async def get_users():
    return users_db
