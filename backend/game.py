import random
from typing import List

from flask import Blueprint, jsonify, request
from sqlalchemy import and_

from geopy.distance import geodesic

from . import db

from .auth import tokenRequired
from .models import User, Issues, Guilds

game = Blueprint('game', __name__)

XP_STAIRS = [
    1200,
    2400,
    3600,
    4800,
    5600,
    6400,
    7200,
    10000
]


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
        owning_guild = 0,
    )

    db.session.add(new_issue)
    db.session.commit()

    return (
        jsonify({"message": f"Issue added"}),
        200,
    )

@game.route('/add-issue-bulk', methods=["POST"])
@tokenRequired
def add_issue_bulk(username):
    req = request.get_json()

    for issue_dict in req:
        new_issue = Issues(
            image_id = issue_dict["image_id"],
            longitude = issue_dict["longitude"],
            latitude = issue_dict["latitude"],
            osm_way_id = issue_dict["osm_way_id"],
            category = issue_dict["category"],
        )

        db.session.add(new_issue)
        db.session.commit()

    return (
        jsonify({"message": f"Issue Bulk added"}),
        200,
    )



@game.route('/get-issues')
@tokenRequired
def get_issues(username):

    req = request.get_json()

    user_location = (req["latitude"], req["longitude"])

    issues_list = Issues.query.all()

    issues_dict_list = [issue.as_dict() for issue in issues_list]

    for issue_dict in issues_dict_list:
        if issue_dict["owning_guild"] != 0:
            owning_guild = Guilds.query.get(issue_dict["owning_guild"])
            issue_dict["owning_guild"] = owning_guild.as_dict()
        else:
            del issue_dict["owning_guild"]

        
        if issue_dict["solved_by"] != "undefined":
            solved_by = User.query.filter(User.username == issue_dict["solved_by"]).first()
            a = solved_by.as_dict()
            issue_dict["solved_by"] = solved_by.as_dict()
        else:
            del issue_dict["solved_by"]
        
        issue_dict["xp_value"] = get_xp_value(issue_dict["id"])
        issue_dict["points_value"] = get_points_value(issue_dict["id"])
        issue_dict["nearest_neighbor"], issue_dict["circle_radius"] = get_nearest_neighbour_id(issue_dict, issues_dict_list)


        issue_location = (issue_dict["latitude"], issue_dict["longitude"])

        issue_dict["user_distance"] = round(geodesic(user_location, issue_location).meters)

    response = jsonify(issues_dict_list)

    return (
        response,
        200,
    )


@game.route('/solve-issue', methods=["POST"])
@tokenRequired
def solve_issue(username):
    req = request.get_json()
    
    issue_id = req["id"]

    issue: Issues = Issues.query.get(issue_id)
    user: User = User.query.filter(User.username == username).first()

    # current_position = (req["current_latitude"], req["current_longitude"])
    # issue_position = (issue.latitude, issue.longitude)

    # TODO Check if the photo is okay
    photo_okay = True
    if True or photo_okay:
        if user.guild:
            issue.owning_guild = user.guild
            issue.solved_by = user.username
        user.current_xp += get_xp_value(issue_id)
        user.current_level, user.level_xp = get_level_from_xp(user.current_xp, XP_STAIRS)

    # print(geodesic(current_position, issue_position).meters)

    db.session.commit()

    return(
        jsonify({"message": f"Issue solved"}),
        200,
    )


@game.route('/add-guild', methods=["POST"])
@tokenRequired
def add_guilds(username):

    req = request.get_json()

    new_guild = Guilds(
        name=req["guild_name"],
        color=req["guild_color"],
        icon=req["guild_icon"]
    )

    db.session.add(new_guild)
    db.session.commit()

    return(
        jsonify({"message": f"Added a guild"}),
        200,
    )


@game.route('/get-guilds')
@tokenRequired
def get_guilds(username):

    guild_list = Guilds.query.all()

    response = jsonify([guild.as_dict() for guild in guild_list])

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
        jsonify({"message": f"User has chosen a guild"}),
        200,
    )


def get_xp_value(id):
    random.seed(id)
    return random.choice(
        [1000, 3000, 5000]
    )

def get_points_value(id):
    random.seed(id)
    return random.choice(
        [120, 330, 560]
    )


def get_level_from_xp(current_xp, xp_stairs):

    for i, xp_stair in enumerate(xp_stairs):
        current_xp -= xp_stair
        if current_xp <= 0:
            current_level = i
            break
    print(current_level)
    level_xp = current_xp + xp_stairs[current_level]

    return (current_level, level_xp)


def get_nearest_neighbour_id(reference_issue: Issues, issues_list: List[Issues]) -> int:

    reference_issue_position = (reference_issue["latitude"], reference_issue["longitude"])

    best_distance = 1e10
    nearest_neighbour_id = 0
    
    for current_issue in issues_list:
        current_issue_position = (current_issue["latitude"], current_issue["longitude"])
        if current_issue_position != reference_issue_position:

            dist = geodesic(reference_issue_position, current_issue_position).meters

            if dist < best_distance:
                best_distance = dist
                nearest_neighbour_id = current_issue["id"]
    
    return (nearest_neighbour_id, round(best_distance / 2))