from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from geopy.distance import geodesic
from . import db

from .auth import tokenRequired
from .models import User, Issues

game = Blueprint('game', __name__)

@game.route('/add-issue', methods=["POST"])
@tokenRequired
def add_issue(username):
    req = request.get_json()

    new_issue = Issues(
        image_id = req["image_id"],
        longitude = req["longitude"],
        latitude = req["latitude"],
        osm_way_id = req["osm_way_id"],
        category = req["category"],
        owning_guild = "undefined",
    )

    db.session.add(new_issue)
    db.session.commit()

    return (
        jsonify({"message": f"Issue added"}),
        200,
    )

@game.route('/get-issues')
@tokenRequired
def get_issues(username):
    #req = request.get_json()

    issues_list = Issues.query.all()

    response = jsonify([issue.as_dict() for issue in issues_list])

    return (
        response,
        200,
    )

@game.route('/solve-issue', methods=["POST"])
@tokenRequired
def solve_issue(username):
    req = request.get_json()
    
    # req["current_latitude"]
    # req["current_longitude"]
    
    issue_id = req["id"]

    issue: Issues = Issues.query.get(issue_id)
    user: User = User.query.filter(User.username == username).first()

    current_position = (req["current_latitude"], req["current_longitude"])
    issue_position = (issue.latitude, issue.longitude)

    # TODO Check if the photo is okay
    photo_okay = True
    if True or photo_okay:
        if user.guild:
            issue.owning_guild = user.guild


    print(geodesic(current_position, issue_position).meters)

    return(
        jsonify({"message": f"Issue solved"}),
        200,
    )

@game.route('/get-guilds', methods=["POST"])
@tokenRequired
def get_guilds(username):
    response = jsonify({
        "avaialble_guilds":
            [
                "warrior",
                "mage",
                "orc",
                "princess"
            ]
    })

    return(
        response,
        200,
    )




@game.route('/choose-guild', methods=["POST"])
@tokenRequired
def choose_guild(username):
    req = request.get_json()

    user: User = User.query.filter(User.username == username).first() 

    user.guild = req["guild"]

    db.session.commit()

    return(
        jsonify({"message": f"User has chosen guild"}),
        200,
    )