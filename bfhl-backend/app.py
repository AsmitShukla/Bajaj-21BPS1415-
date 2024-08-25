from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.json['data']
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_lowercase = [char for char in sorted(alphabets) if char.islower()]
        
        response = {
            "is_success": True,
            "user_id": "your_name_ddmmyyyy",
            "email": "your_email@college.com",
            "roll_number": "your_roll_number",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase[-1:] if highest_lowercase else []
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
