from typing import List

from flask import Blueprint, jsonify, request
from sqlalchemy import and_
from . import db

from .auth import tokenRequired
from .models import User, FollowList

profile = Blueprint('profile', __name__)

@profile.route('/profile')
@tokenRequired
def get_profile(username):

    user: User = User.query.filter(User.username == username).first()

    return jsonify(user.as_dict())

@profile.route('/follow', methods=["POST"])
@tokenRequired
def follow(username):
    req = request.get_json()
    new_follow = FollowList(
        initiator_username=username,
        acceptor_username=req["acceptor_username"],
        accepted=False 
    )

    db.session.add(new_follow)
    db.session.commit()

    return (
        jsonify({"message": f"Follow request sent"}),
        200,
    )

@profile.route('/get-follow-requests')
@tokenRequired
def get_follow_requests(username):

    follow_request_list: List[FollowList] = FollowList.query.filter(
        and_(
            FollowList.acceptor_username == username,
            FollowList.accepted == False
        )
    ).all()

    response = jsonify([follow_request.as_dict() for follow_request in follow_request_list])

    return (
        response,
        200,
    )


@profile.route('/get-following')
@tokenRequired
def get_following(username):

    follow_request_list: List[FollowList] = FollowList.query.filter(
        and_(
            FollowList.initiator_username == username,
            FollowList.accepted == True,
        )
    ).all()

    response = jsonify([follow_request.as_dict() for follow_request in follow_request_list])

    return (
        response,
        200,
    )

@profile.route('/get-followers')
@tokenRequired
def get_followers(username):

    follow_request_list: List[FollowList] = FollowList.query.filter(
        and_(
            FollowList.acceptor_username == username,
            FollowList.accepted == True,
        )
    ).all()

    response = jsonify([follow_request.as_dict() for follow_request in follow_request_list])

    return (
        response,
        200,
    )


@profile.route('/accept-follow', methods=["POST"])
@tokenRequired
def accept_follow(username):
    req = request.get_json()

    follow_request: FollowList = FollowList.query.filter(
        and_(
            FollowList.initiator_username == req["initiator_name"],
            FollowList.acceptor_username == username)
    ).first()

    if not follow_request.accepted:
        follow_request.accepted = True
    
    db.session.commit()

    return(
        jsonify({"message": f"Follow request accepted"}),
        200,
    )


@profile.route('/unfollow', methods=["POST"])
@tokenRequired
def unfollow(username):
    req = request.get_json()
    
    follow_request: FollowList = FollowList.query.filter(
        and_(
            FollowList.acceptor_username == req["acceptor_name"],
            FollowList.initiator_username == username),
            FollowList.accepted == True
    ).delete()
    
    db.session.commit()

    return(
        jsonify({"message": f"User unfollowed"}),
        200,
    )