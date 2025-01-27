# app/models/disaster.py
from app import db  # Import db directly from app
from datetime import datetime

class Disaster(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    disaster_type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    severity_level = db.Column(db.String(20), nullable=False)  # Changed from Enum to String
    location = db.Column(db.String(255), nullable=False)
    proof_url = db.Column(db.String(255))
    status = db.Column(db.String(20), nullable=False)  # Changed from Enum to String
    approved_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Disaster {self.disaster_type}>'
