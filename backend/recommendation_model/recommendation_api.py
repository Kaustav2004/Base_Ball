# recommendation_api.py
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow calls from different domains if needed

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    # Expecting a JSON payload with a key "favTeams"
    data = request.get_json() or {}
    fav_teams = data.get('favTeams', [])
    
    # Dummy recommendation logic:
    # Later, you will replace this with your AI model that uses `fav_teams`
    recommended_team_ids = [101, 102, 103, 104]
    
    return jsonify({
        'recommendations': recommended_team_ids
    })

if __name__ == '__main__':
    # Running on port 5000; adjust if necessary.
    app.run(debug=True, host='0.0.0.0', port=5000)
