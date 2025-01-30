# app/models/disaster.py
from app.app__init__ import db  # Use the new module name
from datetime import datetime

class Disaster(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    disaster_type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    severity_level = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    proof_url = db.Column(db.String(255))  # Store file path instead of URL
    status = db.Column(db.String(20), nullable=False, default="submitted")
    district = db.Column(db.String(255), nullable=False)
    casualties = db.Column(db.Integer, nullable=False, default=0)
    injuries = db.Column(db.Integer, nullable=False, default=0)
    missing_persons = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref='disasters')

    def __repr__(self):
        return f'<Disaster {self.disaster_type}>'

