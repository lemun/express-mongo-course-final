# Express MongoDB Course - Final Project

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

> This is my final exam project for the **TESI (The External Studies Institute)** certification in backend development, featuring JWT authentication, logging, and MongoDB integration.

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lemun/express-mongo-course-final.git
   cd express-mongo-course-final
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Development Mode**

   ```bash
   npm run dev
   ```

5. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 📂 Project Structure

```
src/
├── app/
│   └── index.ts              # Application entry point & server setup
├── controllers/              # Request handlers & response logic
│   └── auth.controller.ts    # Authentication controller
├── middleware/               # Custom middleware functions
│   ├── jwt.middleware.ts     # JWT authentication middleware
│   └── logger.middleware.ts  # Request logging middleware
├── repositories/             # Data access layer
│   ├── axios.repository.ts   # HTTP client repository
│   └── json.repository.ts    # File-based data repository
├── routes/                   # API route definitions
│   └── auth.route.ts         # Authentication routes
├── schemas/                  # Data validation schemas
│   ├── env.schema.ts         # Environment validation
│   ├── json.schema.ts        # JSON data schemas
│   └── user.schema.ts        # User data validation
├── services/                 # Business logic layer
│   └── auth.service.ts       # Authentication service
└── utils/                    # Utility functions
    └── utils.ts              # Common utilities & helpers
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| `POST` | `/api/auth/register` | Register new user | ❌            |
| `POST` | `/api/auth/login`    | Login user        | ❌            |
| `GET`  | `/api/auth/profile`  | Get user profile  | ✅            |

### Example Requests

**Register User:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "securepassword123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "securepassword123"}'
```

**Access Protected Route:**

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "x-access-token: your-jwt-token-here"
```

## Security Features

- **Password Hashing:** All passwords are hashed using bcrypt with 10 salt rounds
- **JWT Tokens:** Secure token-based authentication with 24-hour expiration
- **Error Handling:** Secure error responses without sensitive data exposure
- **Environment Variables:** Sensitive configuration stored in environment variables

## Validation Rules

### User Registration/Login

- **Username:** unique, required
- **Password:** required