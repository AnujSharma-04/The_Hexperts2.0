# app/models/notification.py
from datetime import datetime
from app.app__init__ import db  # Use the new module name

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    type = db.Column(db.String(20), nullable=False, default='general')

    user = db.relationship('User', backref='notifications')  # Define the relationship with the User model

    def __repr__(self):
        return f'<Notification {self.id}>'
