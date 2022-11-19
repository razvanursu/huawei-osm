from flask import Blueprint, jsonify, request
from . import db

from .auth import tokenRequired
from .models import User

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Index'