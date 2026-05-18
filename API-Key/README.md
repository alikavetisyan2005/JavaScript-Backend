# API Key Task

A simple Express.js API that demonstrates:

- API key authentication
- Permission-based authorization
- Public and protected routes

---

# Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

---

# Run the Server

Start the server with:

```bash
node index.js
```

You should see:

```bash
Server running on port: 3000
```

---

# API Clients

| User | API Key | Permissions |
|------|----------|-------------|
| Albert | iubwg9g | read, write |
| Sargis | iwioqbo | read |
| Tigran | whsvhsg | write |

---

# Routes

## Public Route

### GET `/status`

Does not require an API key.

### Example

```bash
curl http://localhost:3000/status
```

---

# Protected Routes

Protected routes require the `x-api-key` header.

---

## GET `/products`

Requires `read` permission.

### Example (Success)

```bash
curl -H "x-api-key: iwioqbo" \
http://localhost:3000/products
```

### Example Response

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200
  },
  {
    "id": 2,
    "name": "Phone",
    "price": 800
  }
]
```

---

## GET `/products` Without Header

### Example

```bash
curl http://localhost:3000/products
```

### Example Response

```json
{
  "message": "Not authorized"
}
```

---

## GET `/products` With Invalid API Key

### Example

```bash
curl -H "x-api-key: wrongkey" \
http://localhost:3000/products
```

### Example Response

```json
{
  "message": "Not authorized"
}
```

---

## POST `/products`

Requires `write` permission.

### Example (Success)

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "x-api-key: iubwg9g" \
-d '{"name":"Tablet","price":500}' \
http://localhost:3000/products
```

### Example Response

```json
{
  "message": "Successfully created"
}
```

---

## POST `/products` Without Write Permission

### Example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "x-api-key: iwioqbo" \
-d '{"name":"Tablet","price":500}' \
http://localhost:3000/products
```

### Example Response

```json
{
  "message": "You dont have permission"
}
```

---

# Project Structure

```text
api-key-task/
│
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

# .gitignore

```gitignore
node_modules/
.env
```