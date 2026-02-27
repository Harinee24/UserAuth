# 🔐 User Authentication API (Node.js + JWT)

A simple REST API for User Registration and Login built using:

Node.js

Express.js

MongoDB

Mongoose

bcrypt (Password Encryption)

JSON Web Token (JWT)


This project demonstrates secure authentication using encrypted passwords and token-based authorization.


---

🚀 Features

📝 User Registration

🔐 User Login

🔑 Password Hashing using bcrypt

🎟️ JWT Token Generation

🔒 Protected Route Example

🌐 RESTful API structure



---

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

ODM: Mongoose

Security: bcryptjs, jsonwebtoken

Middleware: CORS



---

📁 Project Structure

All functionality is implemented in a single file:

authServer.js

This file includes:

MongoDB connection

User schema

Register route

Login route

JWT token generation

Protected route



---

⚙️ Installation & Setup

1️⃣ Initialize Project

npm init -y

2️⃣ Install Dependencies

npm install express mongoose bcryptjs jsonwebtoken cors


---

🗄️ MongoDB Setup

Make sure MongoDB is running locally on:

mongodb://127.0.0.1:27017/authDB


---

▶️ Run the Server

node authServer.js

Server runs at:

http://localhost:5000


---

📡 API Endpoints

📝 Register User

POST /register

Request Body:

{
  "username": "harinee",
  "email": "harinee@gmail.com",
  "password": "123456"
}

Response:

{
  "message": "User Registered Successfully"
}


---

🔐 Login User

POST /login

Request Body:

{
  "email": "harinee@gmail.com",
  "password": "123456"
}

Response:

{
  "message": "Login Successful",
  "token": "JWT_TOKEN_HERE"
}


---

🔒 Protected Route Example

GET /profile

Headers:

Authorization: JWT_TOKEN_HERE

Returns user data if token is valid.


---

🔐 Security Implementation

Passwords are encrypted using bcrypt hashing

JWT token is generated on successful login

Token expires in 1 hour

Protected route verifies token before granting access

Password field is excluded when returning user data



---

🎯 Learning Outcomes

Understanding password encryption

Implementing JWT authentication

Creating secure REST APIs

Connecting MongoDB with Node.js

Building protected routes



---
