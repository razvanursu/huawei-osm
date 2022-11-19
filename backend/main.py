from flask import Blueprint, jsonify, request
from . import db

from .auth import tokenRequired
from flask_cors import CORS, cross_origin
from .models import User

main = Blueprint('main', __name__)

@main.route('/')
@cross_origin()
def index():
    return 'Index'