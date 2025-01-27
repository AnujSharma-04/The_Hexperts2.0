class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///disaster_reporting.db'  # Update with your DB URI
    JWT_SECRET_KEY = 'your_jwt_secret_key'  # Secret key for JWT