from flask import jsonify, request
from . import main
from ..models.log import Log
from ..models import db

@main.route('/api/logs', methods=['POST'])
def create_log():
    data = request.get_json()
    new_log = Log(
        action_type=data['action_type'],
        disaster_id=data['disaster_id'],
        authority_id=data['authority_id']
    )
    db.session.add(new_log)
    db.session.commit()
    return jsonify({"message": "Log created!"}), 201

@main.route('/api/logs', methods=['GET'])
def get_logs():
    logs = Log.query.all()
    return jsonify([{
        "id": log.id,
        "action_type": log.action_type,
        "disaster_id": log.disaster_id,
        "authority_id": log.authority_id
    } for log in logs])
