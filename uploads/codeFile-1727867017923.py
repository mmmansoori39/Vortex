from flask import Flask, request, jsonify, render_template_string
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import secrets
import random
import os
from typing import Tuple, Dict, Any

app = Flask(__name__)

# Setup rate limiter
limiter = Limiter(
    key_func=get_remote_address,
    app=app
)

# Load words from common.txt
def load_wordlist(filename: str) -> list:
    if not os.path.exists(filename):
        raise FileNotFoundError(f"The file {filename} does not exist.")
    
    with open(filename, 'r', encoding='utf-8') as file:
        words = [line.strip() for line in file if line.strip() and line.strip().isalnum()]
    
    if not words:
        raise ValueError(f"No valid words found in {filename}")
    
    print(f"Loaded {len(words)} words from {filename}")
    return words

# Select a random word from the wordlist
try:
    WORDLIST = load_wordlist('common.txt')
    SECRET_TOKEN = random.choice(WORDLIST)
    print(f"Selected secret token: {SECRET_TOKEN}")
except Exception as e:
    print(f"Error loading wordlist: {e}")
    print("Using a default word list for demonstration")
    WORDLIST = ["python", "flask", "challenge", "security", "hacking"]
    SECRET_TOKEN = random.choice(WORDLIST)
    print(f"Selected secret token from default list: {SECRET_TOKEN}")

# Generate a simple visual hint (first letter of the token)
def generate_hint_svg():
    first_letter = SECRET_TOKEN[0].upper()
    return f'''
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" font-family="Arial" font-size="40" fill="#333333" 
              text-anchor="middle" dominant-baseline="central">{first_letter}</text>
    </svg>
    '''

@app.route('/api/check-token', methods=['GET'])
@limiter.limit("10000 per hour")
def check_token() -> Tuple[Dict[str, Any], int]:
    token = request.args.get('token', '')
    if token == SECRET_TOKEN:
        return jsonify({
            "message": "Congratulations! You found the correct token.",
            "flag": f"CTF{{{secrets.token_hex(8)}}}"
        }), 200
    else:
        return jsonify({"message": "Incorrect token."}), 403

@app.route('/hint')
def hint():
    return generate_hint_svg(), 200, {'Content-Type': 'image/svg+xml'}

@app.route('/')
def home() -> str:
    return render_template_string('''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Token Finder Challenge</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { color: #333; }
            #hintButton { padding: 10px 20px; font-size: 16px; cursor: pointer; }
            #hintDisplay { margin-top: 20px; }
        </style>
    </head>
    <body>
        <h1>Token Finder Challenge</h1>
        <p>Try to find the secret token! Make a GET request to /api/check-token?token=YOUR_GUESS</p>
        <p>You have a limit of 10,000 requests per hour.</p>
        <p>Hint: The token is a common word from our wordlist.</p>
        <button id="hintButton">Get Visual Hint</button>
        <div id="hintDisplay"></div>
        <script>
            document.getElementById('hintButton').addEventListener('click', function() {
                fetch('/hint')
                    .then(response => response.text())
                    .then(svg => {
                        document.getElementById('hintDisplay').innerHTML = svg;
                    });
            });
        </script>
    </body>
    </html>
    ''')

if __name__ == '__main__':
    app.run(debug=False)