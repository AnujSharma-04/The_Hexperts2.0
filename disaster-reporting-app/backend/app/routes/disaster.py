# app/routes/disaster.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.app__init__ import db  # Use the new module name
from app.models.disaster import Disaster
from ..models.user import User
from ..models.log import Log
from ..models.notification import Notification  # Import Notification model
import os
from werkzeug.utils import secure_filename



# Create a Blueprint for disaster-related routes
disaster_bp = Blueprint('disaster', __name__,url_prefix='/api')



@disaster_bp.route('/disaster/report', methods=['POST'])
@jwt_required()  # Ensure user is authenticated
def report_disaster():
    # Get the current user's ID from the JWT token
    current_user_id = get_jwt_identity()

    # Get form data instead of JSON
    data = request.get_json()
    disaster_type = data.get('disaster_type')
    description = data.get('description')
    severity_level = data.get('severity_level')
    location = data.get('location')
    district = data.get('district')
    casualties = int(data.get('casualties', 0))
    injuries = int(data.get('injuries', 0))
    proof_url = data.get('proof_url')
    missing_persons = int(data.get('missing_persons', 0))

    # Validate required fields
    if not disaster_type or not description or not severity_level or not location:
        return jsonify({"message": "Missing required fields!"}), 400



    # Create a new Disaster report
    new_disaster = Disaster(
        user_id=current_user_id,
        disaster_type=disaster_type,
        description=description,
        severity_level=severity_level,
        location=location,
        proof_url=proof_url,  # Save the uploaded file path
        status='submitted',
        district=district,
        casualties=casualties,
        injuries=injuries,
        missing_persons=missing_persons
    )

    # Save to database
    db.session.add(new_disaster)
    db.session.commit()

    # Create a notification for the user
    new_notification = Notification(
        user_id=current_user_id,
        message=f"New disaster report submitted: {disaster_type}",
        is_read=False
    )
    db.session.add(new_notification)
    db.session.commit()

    return jsonify({"message": "Disaster report submitted successfully!", "disaster_id": new_disaster.id}), 201


@disaster_bp.route('disaster/getlist', methods=['GET'])
@jwt_required()  # Ensure the user is authenticated
def get_all_disasters():
    # Get the current user's ID from the JWT token
    current_user_id = get_jwt_identity()

    # Fetch the user from the database using their ID
    user = User.query.get(current_user_id)

    # Check if the user has the "authority" role
    if user.role != "authority":
        return jsonify({"message": "You do not have permission to view this resource."}), 403

    # Get the authority's district (jurisdiction)
    authority_district = user.district

    # Query all disasters from the database that belong to the authority's jurisdiction (district)
    disasters = Disaster.query.filter_by(district=authority_district).all()

    # Convert the disaster objects to a list of dictionaries
    disaster_list = []
    for disaster in disasters:
        disaster_list.append({
            "id": disaster.id,
            "disaster_type": disaster.disaster_type,
            "description": disaster.description,
            "severity_level": disaster.severity_level,
            "location": disaster.location,
            "proof_url": disaster.proof_url,
            "status": disaster.status,
            "district": disaster.district,  # Include district in the response
            "created_at": disaster.created_at,
        })

    # Return the list of disasters
    return jsonify(disaster_list), 200

@disaster_bp.route('/disaster/approve', methods=['POST'])
@jwt_required()
def approve_disaster():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != "authority":
        return jsonify({"message": "You do not have permission to approve disasters."}), 403
    
    data = request.get_json()
    disaster_id = data.get('disaster_id')
    disaster = Disaster.query.get(disaster_id)
    if not disaster:
        return jsonify({"message": "Disaster not found."}), 404
    
    if disaster.status != "submitted":
        return jsonify({"message": "This disaster has already been approved or rejected."}), 400
    
    disaster.status = "approved"
    db.session.commit()
    
    new_log = Log(
        action_type="approved",
        disaster_id=disaster.id,
        authority_id=current_user_id
    )
    db.session.add(new_log)
    db.session.commit()
    
    new_notification = Notification(
        user_id=disaster.user_id,
        message=f"Your disaster report '{disaster.disaster_type}' has been approved.",
        is_read=False,
        type="approved"
    )
    db.session.add(new_notification)
    db.session.commit()
    
    return jsonify({"message": "Disaster approved successfully!"}), 200


@disaster_bp.route('disaster/approved', methods=['GET'])
def get_approved_disasters():
    # Get the district from the request
    district = request.args.get('district')

    if not district:
        return jsonify({"message": "District is required."}), 400

    # Query all approved disasters in the given district
    disasters = Disaster.query.filter_by(district=district, status="approved").all()

    if not disasters:
        return jsonify({"message": "No approved disasters found for this district."}), 404

    # Convert the disaster objects to a list of dictionaries
    disaster_list = []
    for disaster in disasters:
        disaster_list.append({
            "id": disaster.id,
            "disaster_type": disaster.disaster_type,
            "description": disaster.description,
            "severity_level": disaster.severity_level,
            "location": disaster.location,
            "proof_url": disaster.proof_url,
            "status": disaster.status,
            "created_at": disaster.created_at,
        })

    # Return the list of approved disasters
    return jsonify(disaster_list), 200

@disaster_bp.route('/disaster/reject', methods=['POST'])
@jwt_required()
def reject_disaster():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.role != "authority":
        return jsonify({"message": "You do not have permission to reject disasters."}), 403
    
    data = request.get_json()
    disaster_id = data.get('disaster_id')
    disaster = Disaster.query.get(disaster_id)
    if not disaster:
        return jsonify({"message": "Disaster not found."}), 404
    
    if disaster.status != "submitted":
        return jsonify({"message": "This disaster has already been approved or rejected."}), 400
    
    disaster.status = "rejected"
    db.session.commit()
    
    new_log = Log(
        action_type="rejected",
        disaster_id=disaster.id,
        authority_id=current_user_id
    )
    db.session.add(new_log)
    db.session.commit()
    
    new_notification = Notification(
        user_id=disaster.user_id,
        message=f"Your disaster report '{disaster.disaster_type}' has been rejected.",
        is_read=False,
        type="rejected"
    )
    db.session.add(new_notification)
    db.session.commit()
    
    return jsonify({"message": "Disaster rejected successfully!"}), 200

@disaster_bp.route('/disaster/submitted', methods=['GET'])
@jwt_required()
def get_submitted_disasters():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user.role != "authority":
        return jsonify({"message": "You do not have permission to view this resource."}), 403

    disasters = Disaster.query.filter_by(district=user.district, status="submitted").all()

    disaster_list = []
    for disaster in disasters:
        disaster_list.append({
            "id": disaster.id,
            "disaster_type": disaster.disaster_type,
            "description": disaster.description,
            "severity_level": disaster.severity_level,
            "location": disaster.location,
            "status": disaster.status,
            "created_at": disaster.created_at,
        })

    return jsonify(disaster_list), 200
