import datetime as dt
import functools
import hashlib
import jwt
import os

from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
from . import db

from .models import User


SALT = "abc123"

# Blueprints modularize code: define these routes
auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def signup():
    """Creates a user"""
    req = request.get_json()
    email, password, username = req["email"], req["password"], req["username"]
    password_hashed = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), b"SALT", 1000
    )

    # Check if user exists
    res = User.query.filter(User.username == username).all()
    if res:
        return (
            jsonify({"message": f"User with username {username} already exists"}),
            400,
        )

    # Create user based on hashed password

    join_date = dt.datetime.now()

    new_user = User(
        username=username,
        password=password_hashed,
        email=email,
        current_level=0,
        join_date=join_date
    )

    db.session.add(new_user)
    db.session.commit()

    # Create token and return
    token = jwt.encode({"username": username, "email": email}, SALT, algorithm="HS256")
    return jsonify({"username": username, "email": email, "token": token})


def tokenRequired(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            # Make sure headers are valid
            if len(request.headers["authorization"].split(" ")) < 2:
                return {
                    "message": "Invalid Authentication!",
                    "data": None,
                    "error": "Unauthorized",
                }, 401
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized",
            }, 401
        try:
            data = jwt.decode(token, SALT, algorithms=["HS256"])
            current_user = User.query.filter(User.username == data["username"]).all()
            if not current_user:
                return {
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized",
                }, 401
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e),
            }, 500

        return f(current_user[0].username, *args, **kwargs)

    return decorated


# add session token to check if someone is logged in
@auth.route("/login", methods=["POST"])
@cross_origin()
def login():
    """Creates a user"""
    req = request.get_json()
    username, password = req["username"], req["password"]
    password_hashed = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), b"SALT", 1000
    )

    # Check if user exists
    res = User.query.filter(User.username == username).all()
    if not res:
        return jsonify({"message": f"User does not exist"}), 400
    else:
        user: User = res[0]

    # Check Password
    email = user.email
    password_check = user.password

    if password_check != password_hashed:
        return jsonify({"message": f"Incorrect Password"}), 400

    # Create token and return
    token = jwt.encode({"username": username, "email": email}, SALT, algorithm="HS256")
    return jsonify({"username": username, "email": email, "token": token})


@auth.route("/protected", methods=["POST"])
@tokenRequired
def protected(username):
    print(username)
    return "HELL World"