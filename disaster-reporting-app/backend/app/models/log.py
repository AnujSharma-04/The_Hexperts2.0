# app/models/log.py
from app.app__init__ import db  # Use the new module name
from datetime import datetime

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    action_type = db.Column(db.String(20), nullable=False)  # Changed from Enum to String
    disaster_id = db.Column(db.Integer, db.ForeignKey('disaster.id'), nullable=False)
    authority_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    disaster = db.relationship('Disaster', backref='logs')  # Relationship with Disaster
    authority = db.relationship('User', backref='logs')  # Relationship with User

    def __repr__(self):
        return f'<Log {self.id}>'
