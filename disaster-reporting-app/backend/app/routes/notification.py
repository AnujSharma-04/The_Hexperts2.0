from flask import jsonify, request
from . import main
from ..models.notification import Notification
from ..models import db

@main.route('/api/notifications', methods=['POST'])
def create_notification():
    data = request.get_json()
    new_notification = Notification(
        user_id=data['user_id'],
        message=data['message']
    )
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"message": "Notification created!"}), 201

@main.route('/api/notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": n.id,
        "message": n.message,
        "is_read": n.is_read
    } for n in notifications])
