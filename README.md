# Users App

A modular Node.js REST API application for managing users, products, and authentication. 
This project uses Express.js and follows a layered architecture for better separation of concerns.

## Features

- User management (create, update, delete, fetch)
- Product handling
- Authentication with middleware
- Logging with Winston
- Modular file structure

## Folder Structure

```
usersApp/
│
├── controllers/           # Route handlers for users, auth, and products
├── files/                 # Static files (e.g. HTML, images)
│   ├── assets/
│   ├── auth/
│   └── user/
├── logger/                # Logger setup using Winston
│   ├── logger.js
│   └── logs/              # Rotating log files
├── middlewares/          # Express middleware (e.g. auth checks)
├── models/               # MongoDB models for users and products
├── routes/               # API route definitions
├── services/             # Business logic and services
├── .env                  # Environment variables
├── .gitignore
├── app.js                # Application entry point
└── package.json
```


## Dependencies

- Express.js
- Mongoose
- dotenv
- Winston (logging)
- JSON Web Token (JWT)

---

> This is a work in progress — user and product modules are under development.
