from flask import Blueprint

main = Blueprint('main', __name__)

from . import auth, disaster, notification, log  # Import your routes here
