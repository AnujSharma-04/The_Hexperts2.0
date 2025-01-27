# create_db.py
from app import create_app, db
from app.models.user import User
from app.models.disaster import Disaster
from app.models.log import Log

# Create the Flask app
app = create_app()

# Create all tables
with app.app_context():
    db.create_all()  # This will create all tables defined in the models
