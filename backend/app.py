from flask import Flask
from flask_cors import CORS
from auth import auth

# Add some boilerplate
app = Flask(__name__)
# app.register_blueprint(auth, url_prefix="/auth")
# app.register_blueprint(dataset, url_prefix="/dataset")
CORS(app)

# load ML model


@app.get("/")
def getReq():
    return "Hello World"
