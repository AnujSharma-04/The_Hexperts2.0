# app/models/disaster.py
from app.app__init__ import db  # Use the new module name
from datetime import datetime

class Disaster(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    disaster_type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    severity_level = db.Column(db.String(20), nullable=False)  # String for severity
    location = db.Column(db.String(255), nullable=False)
    proof_url = db.Column(db.String(255))
    status = db.Column(db.String(20), nullable=False)  # String for status
    district = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to the User (one-to-many)
    user = db.relationship('User', backref='disasters')

    def __repr__(self):
        return f'<Disaster {self.disaster_type}>'
