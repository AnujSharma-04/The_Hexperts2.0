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

    # Update CORS configuration with proper options
    CORS(app, 
         resources={
             r"/api/*": {
                 "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],  # Add both localhost variations
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                 "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
                 "expose_headers": ["Access-Control-Allow-Origin"],
                 "supports_credentials": True
             }
         })
    
    # Add CORS headers to all responses
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    # Load configuration
    app.config.from_object(config_object)
    
    # Initialize extensions
    db.init_app(app)
    # migrate.init_app(app, db)
    jwt.init_app(app)

    @app.before_request
    def log_request_info():
        print('Headers:', request.headers)
        print('Body:', request.get_data())
        
    @app.errorhandler(Exception)
    def handle_error(error):
        print(f"Error occurred: {error}")
        return {"message": "An error occurred", "error": str(error)}, 500

    # Register blueprints with URL prefix
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')
    
    from app.routes.disaster import disaster_bp
    app.register_blueprint(disaster_bp, url_prefix='/api')

    from app.routes.notification import notification_bp
    app.register_blueprint(notification_bp, url_prefix='/api')

    return app
