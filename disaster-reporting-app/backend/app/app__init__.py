# app/app_init.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize extensions
db = SQLAlchemy()
# migrate = Migrate(compare_type=True)
jwt = JWTManager()


def create_app(config_object='app.config.Config'):
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "http://localhost:4173"}})
    
    # Load configuration
    app.config.from_object(config_object)
    
    # Initialize extensions
    db.init_app(app)
    # migrate.init_app(app, db)
    jwt.init_app(app)

    # Register blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)
    
    from app.routes.disaster import disaster_bp
    app.register_blueprint(disaster_bp)  # Example of disaster blueprint registration

    from app.routes.notification import notification_bp
    app.register_blueprint(notification_bp)

    return app
