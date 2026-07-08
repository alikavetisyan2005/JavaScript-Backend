# EventHub API

A RESTful backend API for a community events platform. Users can register, authenticate, browse events, join events, and leave reviews. Organizers can create and manage their own events.

This project was built as part of the Backend Course — Web 2.2 assignment.

---

## Features

### Authentication

* User registration and login
* JWT access token authentication
* Refresh token flow
* Refresh token hashing before database storage
* Refresh token rotation
* Logout with refresh token invalidation
* Password hashing using bcrypt

### User Roles

The system supports two roles:

* `member`

  * Browse events
  * Join and leave events
  * Review attended events

* `organizer`

  * Create events
  * Update own events
  * Delete own events

### Events

* Create, read, update, delete events
* Event fields:

  * Title
  * Description
  * Category
  * Location
  * Start time
  * End time
  * Capacity
  * Organizer

Additional functionality:

* Search events
* Filter by category
* Filter by date range
* Pagination

### Attendance

Members can:

* Join events
* Leave events

Rules:

* Users cannot join the same event twice
* Events cannot exceed their capacity
* Attendance is stored separately to support validation and reviews

### Reviews

Users can review events only if they attended.

Rules:

* Rating must be between 1 and 5
* One review per user per event
* Reviews contain rating and comment

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Joi validation

## Development Tools

* Postman / Thunder Client
* mongosh
* Git

---

# Project Structure

```
src
│
├── controllers
│   ├── auth.controller.js
│   ├── event.controller.js
│   ├── review.controller.js
│   └── attendance.controller.js
│
├── services
│   ├── auth.service.js
│   ├── event.service.js
│   ├── review.service.js
│   └── attendance.service.js
│
├── models
│   ├── User.js
│   ├── Event.js
│   ├── Review.js
│   └── Attendance.js
│
├── routes
│   ├── auth.routes.js
│   ├── event.routes.js
│   ├── review.routes.js
│   └── attendance.routes.js
│
├── middleware
│   ├── auth.middleware.js
│   ├── validation.middleware.js
│   └── error.middleware.js
│
├── utils
│   ├── token.js
│   ├── hash.js
│   └── AppError.js
│
└── app.js
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
PORT=3001

MONGODB_URI=mongodb://127.0.0.1:27017/eventhub

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

Start development server:

```bash
npm run dev
```

The API will run on:

```
http://localhost:3001
```

---

# Authentication Flow

## Login

User receives:

* Access token
* Refresh token

Example response:

```json
{
  "user": {
    "name": "John",
    "email": "john@example.com",
    "role": "member"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

Access tokens are used for protected routes:

```
Authorization: Bearer <access_token>
```

Refresh tokens are stored hashed in MongoDB.

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Refresh Token

```
POST /api/auth/refresh
```

### Logout

```
POST /api/auth/logout
```

---

# Events

### Get all events

```
GET /api/events
```

Query examples:

```
GET /api/events?category=music&page=1&limit=10
```

---

### Get event by ID

```
GET /api/events/:id
```

---

### Create event

```
POST /api/events
```

Required role:

```
organizer
```

---

### Update event

```
PATCH /api/events/:id
```

Only the event owner can update.

---

### Delete event

```
DELETE /api/events/:id
```

Only the event owner can delete.

---

# Attendance

### Join event

```
POST /api/events/:id/join
```

### Leave event

```
DELETE /api/events/:id/leave
```

---

# Reviews

### Create review

```
POST /api/events/:id/reviews
```

Requirements:

* User must have attended the event
* Only one review per user/event

---

# Data Modeling Decisions

## User → Event

Relationship:

```
User (organizer)
      |
      |
    Event
```

Events store a reference to their organizer because events are queried independently and the number of events can grow without limits.

---

## User ↔ Event Attendance

Attendance is stored in a separate collection:

```
Attendance

user
event
createdAt
```

This design was chosen because attendance is a many-to-many relationship.

Benefits:

* Prevent duplicate joins using unique indexes
* Check whether a user attended an event
* Support future features like attendance history

---

## Reviews

Reviews store references:

```
Review

user
event
rating
comment
```

A unique compound index prevents multiple reviews from the same user for the same event.

---

# Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

Validation errors include details about invalid fields.

---

# Testing

A Postman collection is included with examples for:

* Authentication
* Event CRUD
* Joining/leaving events
* Reviews
* Protected routes

---

# Security

Implemented:

* bcrypt password hashing
* JWT authentication
* Refresh token hashing
* Refresh token rotation
* Environment variables for secrets
* Input validation
* Role-based authorization

---

# Author

Albert Avetisyan

Backend Course — Web 2.2
