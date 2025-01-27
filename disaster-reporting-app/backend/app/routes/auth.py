from flask import jsonify, request
from . import main
from ..models.user import User
from ..models import db
from flask_jwt_extended import create_access_token

@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists", "status": "error"}), 400

    new_user = User(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        district=data['district']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully", "status": "success"}), 201

@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid email or password", "status": "error"}), 401
