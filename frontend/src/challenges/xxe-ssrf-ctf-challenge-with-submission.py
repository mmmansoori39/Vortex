from flask import Flask, request, render_template_string
import requests
from werkzeug.serving import run_simple
import threading
import time
import os
import hashlib
import xml.etree.ElementTree as ET

app = Flask(__name__)

# This is our "internal" server that shouldn't be directly accessible
INTERNAL_SERVER_PORT = 8000

# Generate a secure random flag
def generate_flag():
    return "CTF{" + hashlib.sha256(os.urandom(32)).hexdigest()[:16] + "}"

FLAG = generate_flag()

# Create a directory 'loveyou3000' and place the flag inside it
def create_hidden_flag_directory():
    flag_directory_path = os.path.join(os.getcwd(), 'loveyou3000')
    
    # Create the directory if it does not exist
    os.makedirs(flag_directory_path, exist_ok=True)
    
    # Write the flag to a file inside the directory
    flag_file_path = os.path.join(flag_directory_path, 'flag.txt')
    with open(flag_file_path, 'w') as flag_file:
        flag_file.write(FLAG)
    
    print(f"The flag is hidden in: {flag_file_path}")  # Log this for debugging
    
    return flag_directory_path

# Create the hidden flag directory
HIDDEN_FLAG_DIR = create_hidden_flag_directory()

def internal_server():
    def handle_request(environ, start_response):
        # Check the path of the request
        path = environ.get('PATH_INFO', '')
        
        if path == '/loveyou3000/flag.txt':
            # Serve the flag file content
            with open(os.path.join(HIDDEN_FLAG_DIR, 'flag.txt'), 'r') as flag_file:
                flag_content = flag_file.read()
            status = '200 OK'
            headers = [('Content-type', 'text/plain')]
            start_response(status, headers)
            return [flag_content.encode('utf-8')]
        
        # Default response for any other path
        status = '200 OK'
        headers = [('Content-type', 'text/plain')]
        start_response(status, headers)
        return [b"Congratulations! You've reached the internal server."]

    run_simple('localhost', INTERNAL_SERVER_PORT, handle_request)

# Start the internal server in a separate thread
threading.Thread(target=internal_server, daemon=True).start()
time.sleep(1)  # Give the internal server time to start

@app.route('/', methods=['GET'])
def home():
    return render_template_string('''
    <h1>Welcome to the XXE+SSRF Challenge!</h1>
    <p>Try to retrieve the flag from the internal server or by finding the hidden flag directory.</p>
    <p>Submit your XML data to /process_xml</p>
    <h2>Submit Flag</h2>
    <form action="/submit_flag" method="post">
        <input type="text" name="flag" placeholder="Enter flag here">
        <input type="submit" value="Submit Flag">
    </form>
    <h2>Need a hint?</h2>
    <button onclick="showHint()">Get Hint</button>
    <script>
        function showHint() {
            alert("Hint: Try to access the hidden directory using the SSRF vulnerability. Hidden directory is iron man's favorite code");
        }
    </script>
    ''')

@app.route('/process_xml', methods=['POST'])
def process_xml():
    try:
        xml_data = request.data.decode('utf-8')
        
        # Vulnerable XML parsing
        tree = ET.fromstring(xml_data)
        
        # Extract and process data (this part is vulnerable to XXE)
        name = tree.find('name').text
        
        # Simulate SSRF vulnerability
        if tree.find('url') is not None:
            url = tree.find('url').text
            try:
                # Make the GET request to the URL provided in the XML
                response = requests.get(url, timeout=3)
                
                # Return the response without exposing the flag
                return f"Processed name: {name}<br>URL content: {response.text}"
            except requests.RequestException:
                return f"Processed name: {name}<br>Error fetching URL"
        
        return f"Processed name: {name}"
    except Exception as e:
        return f"Error processing XML: {str(e)}"

@app.route('/submit_flag', methods=['POST'])
def submit_flag():
    submitted_flag = request.form.get('flag', '')
    if submitted_flag == FLAG:
        return "Congratulations! You've solved the challenge!"
    else:
        return "Sorry, that's not the correct flag. Keep trying!"

if __name__ == '__main__':
    print("Challenge is running. The flag is:", FLAG)
    app.run(debug=True, port=5000)

