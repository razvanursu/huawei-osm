from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from geopy.distance import geodesic
from . import db

from .auth import tokenRequired
from .models import User, Issues


leaderboards = Blueprint('leaderboards', __name__)

@leaderboards.route('/get-leaderboards')
@tokenRequired
def get_leaderboards():
    pass


