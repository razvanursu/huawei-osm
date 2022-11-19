from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(1000))
    password = db.Column(db.String(100))
    current_level = db.Column(db.Integer)
    join_date = db.Column(db.DateTime())
    guild = db.Column(db.String(100))

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class FollowList(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    initiator_username = db.Column(db.String(1000))
    acceptor_username = db.Column(db.String(1000))
    accepted = db.Column(db.Boolean())

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Issues(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    image_id = db.Column(db.String(100))
    longitude = db.Column(db.Numeric(precision=9, scale=6))
    latitude = db.Column(db.Numeric(precision=8, scale=6))
    osm_way_id = db.Column(db.String(100))
    category = db.Column(db.String(100))
    owning_guild = db.Column(db.String(100))

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}