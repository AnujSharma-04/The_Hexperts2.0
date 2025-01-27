from . import db
from datetime import datetime

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    action_type = db.Column(db.Enum('approve', 'reject', 'merge'), nullable=False)
    disaster_id = db.Column(db.Integer, db.ForeignKey('disaster.id'), nullable=False)
    authority_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Log {self.id}>'
