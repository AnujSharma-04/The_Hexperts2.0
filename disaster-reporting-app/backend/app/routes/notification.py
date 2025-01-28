from flask import jsonify, request , Blueprint
from . import main
from ..models.notification import Notification
from app.app__init__ import db  # Use the new module name
from flask_jwt_extended import jwt_required, get_jwt_identity


notification_bp = Blueprint('notification', __name__,url_prefix='/api')

@notification_bp.route('notification/get', methods=['GET'])
@jwt_required()  # Ensure the user is authenticated
def get_notifications():
    # Get the current user's ID from the JWT token
    current_user_id = get_jwt_identity()

    # Fetch all notifications for the authenticated user
    notifications = Notification.query.filter_by(user_id=current_user_id).all()

    # Convert the notification objects to a list of dictionaries
    notification_list = []
    for notification in notifications:
        notification_list.append({
            "id": notification.id,
            "message": notification.message,
            "is_read": notification.is_read,
            "created_at": notification.created_at,
        })

    # Return the list of notifications
    return jsonify(notification_list), 200
