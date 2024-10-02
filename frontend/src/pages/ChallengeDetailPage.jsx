import React from "react";
import { useParams } from "react-router-dom";
import CodeSandbox from "../components/CodeSandbox"; // Assuming CodeSandbox is in the same directory



const challengesData = [
  {
    id: "1",
    difficulty: "Trivial",
    name: "A little something to get you started",
    skills: "Web",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secret Login</title>
</head>

<body>
    <h1>Secret Login</h1>
	<script>
		function displayText() {
			var text = document.getElementById("textField");
			text.style.display = "block";
		}
	</script>
	Do you need a <button onclick="displayText()">Hint?</button>
	
	<div id="textField" style="display: none;">
		"Decode the hidden string, admin holds the key."
	</div>
	<hr>
    <form id="loginForm" action="#" >
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>
        <input type="submit" value="Login">
    </form>

    <p id="message"></p>
	<p style="display:none;">I am the most common username used</p>
	
    <p id="encodedSecret" style="display: none;">
        VGhlIHNlY3JldCBwYXNzd29yZCBpczogY3RmX21hc3Rlcg==
    </p>
    <script>
        const flagParts = [
            'Q1RG', 'e2gxZ', 'GQzbl9z', 'M2NyM3', 'Q1XzRyM', 'l9mdW5', '9'
        ];

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting and refreshing the page
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const encodedSecret = document.getElementById('encodedSecret').textContent.trim();
            const decodedSecret = atob(encodedSecret);
            const secretPassword = decodedSecret.split(': ')[1];

            console.log(secretPassword)
            
            if (username === 'admin' && password === secretPassword) {
                const flag = atob(flagParts.join(''));
                document.getElementById('message').textContent = 'Login successful! Here\'s your flag: ' + flag;
            } else {
                document.getElementById('message').textContent = 'Invalid credentials!';
            }
        });
    </script>
</body>
</html>
`,
  },
  {
    id: "3",
    difficulty: "Easy",
    name: "Encrypted Pastebin",
    skills: "Web",
    content: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XXE + SSRF Challenge</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1, h2 {
            color: #333;
        }
        input[type="text"],
        textarea {
            width: 100%;
            padding: 10px;
            margin: 5px 0 20px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="submit"], button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        input[type="submit"]:hover, button:hover {
            background-color: #0056b3;
        }
        .response {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .error {
            color: red;
        }
        .hintButton{
        margin-top: 6px;
        width: 112px;
        }
        
    </style>
</head>
<body>
    <h1>Welcome to the XXE + SSRF Challenge!</h1>
    <p>Try to retrieve the flag from the internal server or by finding the hidden flag directory.</p>

    <h2>Submit Flag</h2>
    <form id="flagForm">
        <input type="text" id="flagInput" placeholder="Enter flag here" required>
        <input type="submit" value="Submit Flag">
    </form>

    <h2>Process XML</h2>
    <form id="xmlForm">
        <textarea id="xmlInput" placeholder="<data><name>Your Name</name><url>http://example.com</url></data>" rows="5" required></textarea>
        <input type="submit" value="Submit XML">
    </form>

    <button id="hintButton" class="hintButton">Get Hint</button>

    <div id="response" class="response"></div>
    <div id="error" class="error"></div>

    <script>
        const flagForm = document.getElementById('flagForm');
        const xmlForm = document.getElementById('xmlForm');
        const responseDiv = document.getElementById('response');
        const errorDiv = document.getElementById('error');

        flagForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const flag = document.getElementById('flagInput').value;

            try {
                const res = await axios.post('/submit_flag', { flag });
                responseDiv.innerHTML = res.data;
                errorDiv.innerHTML = '';
            } catch (err) {
                errorDiv.innerHTML = 'Error submitting flag';
                responseDiv.innerHTML = '';
            }
        });

        xmlForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const xmlData = document.getElementById('xmlInput').value;

            try {
                const res = await axios.post('/process_xml', xmlData, {
                    headers: { 'Content-Type': 'application/xml' },
                });
                responseDiv.innerHTML = res.data;
                errorDiv.innerHTML = '';
            } catch (err) {
                errorDiv.innerHTML = 'Error processing XML';
                responseDiv.innerHTML = '';
            }
        });

        document.getElementById('hintButton').addEventListener('click', () => {
            alert("Hint: Try to access the hidden directory using the SSRF vulnerability. Hidden directory is iron man's favorite code");
        });
    </script>
</body>
</html>
`
  },
  {
    id: "2",
    difficulty: "Hard",
    name: "Photo Gallery",
    skills: "Web",
    content: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Token Finder Challenge</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        h1 { color: #333; }
        input[type="text"] {
            padding: 10px;
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
        }
        button:hover {
            background-color: #0056b3;
        }
        #hintDisplay {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f0f0f0;
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            color: #333;
        }
        .message {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Token Finder Challenge</h1>
    <p>Try to find the secret token! Enter your guess below:</p>
    <input type="text" id="tokenInput" placeholder="Enter your token guess here" />
    <button id="submitButton">Submit Token</button>
    <div id="message" class="message"></div>

    <p>You have a limit of 10,000 attempts per hour (simulated).</p>
    <p>Hint: The token is a common word from our wordlist.</p>
    <button id="hintButton">Get Visual Hint</button>
    <div id="hintDisplay">?</div>

    <script>
        const WORDLIST = ["python", "flask", "challenge", "security", "hacking"];
        const SECRET_TOKEN = WORDLIST[Math.floor(Math.random() * WORDLIST.length)];

        // Submit token logic
        document.getElementById('submitButton').addEventListener('click', function() {
            const tokenInput = document.getElementById('tokenInput').value;
            const messageDiv = document.getElementById('message');

            if (tokenInput === SECRET_TOKEN) {
                messageDiv.innerHTML = 'Congratulations! You found the correct token.<br>Flag: CTF{' + Math.random().toString(16).slice(2, 10) + '}';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.innerHTML = 'Incorrect token. Try again!';
                messageDiv.style.color = 'red';
            }
        });

        // Hint button logic
        document.getElementById('hintButton').addEventListener('click', function() {
            const hintDisplay = document.getElementById('hintDisplay');
            hintDisplay.innerHTML = SECRET_TOKEN[0].toUpperCase();  // Display the first letter as a hint
        });
    </script>
</body>
</html>
`
  },
  {
    id: "4",
    difficulty: "Moderate",
    name: "Postbook",
    skills: "Crypto",
    content: "<p>Implement a secure posting mechanism.</p>", // Add your HTML content here
  },
];

const ChallengeDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  const challenge = challengesData.find((ch) => ch.id === id); // Find the corresponding challenge

  if (!challenge) {
    return <div>Challenge not found</div>; 
  }

  return (
    <div className="lg:w-2/3 sm:w-4/5 min-w-96 p-4 mt-20 rounded-md font-mono">
      <div className="" >
      <h1 className="text-2xl font-bold">{challenge.name}</h1>
      <div className="flex justify-between *:text-sm">
        <p className="">Difficulty: {challenge.difficulty}</p>
        <p className="">Skills: {challenge.skills}</p>
      </div>
      </div>
      <div className="challenge-container mt-4">
        <CodeSandbox code={challenge.content} />{" "}
        
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
