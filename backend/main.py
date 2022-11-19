from flask import Blueprint
from . import db

from .auth import tokenRequired
from .models import User

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Index'

@main.route('/profile')
@tokenRequired
def profile(username):

    U

    return 'Profile'