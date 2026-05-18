HTTP Basic Auth API (Node.js + Express)

This is a simple Node.js + Express API that demonstrates HTTP Basic Authentication using a hardcoded list of users.

The project includes:

A public route
Protected routes using middleware
Basic Auth validation
Fake items data for authenticated users
🚀 How to Run the Server
1. Install dependencies
npm install
2. Create a .env file
PORT=3001
3. Start the server
node server.js

Server will run at:

http://localhost:3001
📌 API Endpoints
🟢 Public Route
GET /

Response:

{
  "message": "Home"
}
🔐 Protected Route 1
GET /protected

Requires Basic Auth.

Response (success):

{
  "message": "Welcome dear alikavetisyan7"
}
🔐 Protected Route 2 (Items)
GET /items

Requires Basic Auth.

Response (success):

{
  "message": "Items for authenticated users...",
  "items": [
    { "id": 1, "name": "Laptop" },
    { "id": 2, "name": "Phone" },
    { "id": 3, "name": "Headphones" },
    { "id": 4, "name": "Keyboard" }
  ]
}
🧪 Example Requests (curl)
✅ Successful request
curl -u alikavetisyan7:pass1234 http://localhost:3001/protected
curl -u emmaavetisyan7:password23 http://localhost:3001/items
❌ Failed request (wrong password)
curl -u alikavetisyan7:wrongpassword http://localhost:3001/items

Response:

{
  "message": "Invalid credentials"
}
❌ Failed request (no credentials)
curl http://localhost:3001/items

Response:

{
  "message": "Unauthorized"
}

And the server will also return:

WWW-Authenticate: Basic realm="User Visible Realm"
🔐 How Authentication Works

Client sends:

Authorization: Basic base64(username:password)
Server:
decodes credentials
checks against hardcoded users
allows or rejects request
👤 Test Users
Username	Password
alikavetisyan7	pass1234
maratavetisyan7	pass34
emmaavetisyan7	password23
📦 Tech Stack
Node.js
Express.js
HTTP Basic Authentication (custom middleware)
📌 Notes
This project is for learning purposes only
Do not use hardcoded credentials in production
Use JWT or OAuth for real-world apps