from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.app__init__ import db
from app.models.log import Log
from app.models.disaster import Disaster
from app.models.user import User

# Corrected Blueprint name and url_prefix
stats_bp = Blueprint('stats', __name__, url_prefix='/api')

@stats_bp.route('/logs', methods=['GET'])
@jwt_required()
def get_logs():
    # Get the current user's ID and fetch their role
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or user.role != "authority":
        return jsonify({"message": "You do not have permission to access logs."}), 403
    
    district = request.args.get('district')
    if not district:
        return jsonify({"message": "District parameter is required."}), 400
    
    # Fetch logs for disasters in the given district
    logs = (db.session.query(Log, Disaster)
            .join(Disaster, Log.disaster_id == Disaster.id)
            .filter(Disaster.district == district)
            .order_by(Log.created_at.desc())
            .all())

    log_list = [{
        "id": log.Log.id,
        "action": log.Log.action_type,
        "disaster_type": log.Disaster.disaster_type,  # Ensure this is included
        "location": log.Disaster.location,  # Ensure this is included
        "timestamp": log.Log.created_at.strftime("%Y-%m-%d %H:%M:%S")  # Convert timestamp properly
    } for log in logs]

    return jsonify(log_list), 200

@stats_bp.route('/authority/stats', methods=['GET'])  # Fixed route
@jwt_required()
def get_authority_stats():
    # Get the current user's ID and fetch their role
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or user.role != "authority":
        return jsonify({"message": "You do not have permission to access statistics."}), 403
    
    district = request.args.get('district')
    if not district:
        return jsonify({"message": "District parameter is required."}), 400
    
    # Query statistics for the given district
    total_reported = Disaster.query.filter_by(district=district).count()
    approved = Disaster.query.filter_by(district=district, status="approved").count()
    rejected = Disaster.query.filter_by(district=district, status="rejected").count()
    
    stats = {
        "total_reported": total_reported,
        "approved": approved,
        "rejected": rejected
    }
    
    return jsonify(stats), 200
