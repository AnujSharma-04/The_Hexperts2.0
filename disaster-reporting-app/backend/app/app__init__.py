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
    app.register_blueprint(auth_bp)
    
    from app.routes.disaster import disaster_bp
    app.register_blueprint(disaster_bp, url_prefix='/api')

    from app.routes.notification import notification_bp
    app.register_blueprint(notification_bp)

    return app
