from app.app__init__ import create_app, db # Import from the new file name
from app.models.user import User
from app.models.disaster import Disaster
from app.models.log import Log


app = create_app()

# Create all tables
with app.app_context():
    db.create_all()  # This will create all tables defined in the models

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
