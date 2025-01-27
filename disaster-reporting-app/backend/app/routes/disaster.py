from flask import jsonify
from . import main

@main.route('/api/disasters', methods=['GET'])
def get_disasters():
    # Placeholder for getting disasters
    return jsonify({"disasters": []})