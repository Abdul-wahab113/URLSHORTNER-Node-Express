# URL Shortener Application

A full-stack URL shortening service built with Node.js and Express.js that allows users to create shortened versions of long URLs, manage their shortened links, and redirect to the original URLs.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

---

## 🎯 Project Overview

The URL Shortener Application is a modern web service that enables users to:

- **Create short URLs**: Transform long, unwieldy URLs into concise, shareable short codes
- **Manage URLs**: View, organize, and delete their shortened URLs
- **Redirect**: Automatically redirect from short codes to original URLs
- **User Authentication**: Secure user registration and login with JWT tokens
- **Password Security**: Passwords are hashed before storage using cryptographic algorithms

This application is designed for ease of use, security, and scalability, making it ideal for personal projects, businesses, or large-scale deployments.

---

## ✨ Features

### Core Features
- ✅ **User Authentication**: Register, login, and manage user accounts securely
- ✅ **URL Shortening**: Generate custom or automatic short codes for long URLs
- ✅ **URL Management**: View all shortened URLs created by the user
- ✅ **URL Deletion**: Remove shortened URLs from the system
- ✅ **Auto-Redirect**: Redirect from short codes to original URLs with HTTP 301 status
- ✅ **Custom Short Codes**: Allow users to define their own short codes
- ✅ **Automatic Short Code Generation**: System generates unique 6-character codes using nanoid
- ✅ **JWT Authentication**: Stateless authentication using JSON Web Tokens
- ✅ **Input Validation**: Comprehensive validation using Zod schema validation
- ✅ **PostgreSQL Database**: Robust relational database using PostgreSQL
- ✅ **Docker Support**: Easy deployment with Docker Compose

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js ~4.22.1
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM ^0.45.2
- **Migration Tool**: Drizzle Kit ^0.31.10

### Authentication & Security
- **JWT**: jsonwebtoken ^9.0.3
- **Password Hashing**: Custom hash implementation with salt

### Utilities
- **URL Generation**: nanoid ^5.1.7
- **Validation**: Zod ^4.3.6
- **Database Driver**: pg ^8.20.0
- **Environment Variables**: dotenv ^17.4.0

### Development
- **Node Watch**: Hot reload during development (`node --watch`)
- **Package Manager**: pnpm @10.33.0

---

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **pnpm**: v10.33.0 or higher
  ```bash
  npm install -g pnpm
  ```
- **PostgreSQL**: v16 or higher ([Download](https://www.postgresql.org/download/))
  - OR **Docker & Docker Compose**: For containerized PostgreSQL
- **Git**: For version control ([Download](https://git-scm.com/))

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd CompleteURLShortnerProject-Node&Express
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/urlshortner_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Database Credentials (for Docker Compose)
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password_here
DB_NAME=urlshortner_db
DB_PORT=5432
```

---

## ⚙️ Configuration

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `DB_USERNAME` | PostgreSQL username (Docker) | `postgres` |
| `DB_PASSWORD` | PostgreSQL password (Docker) | `secure_password` |
| `DB_NAME` | Database name (Docker) | `urlshortner_db` |
| `DB_PORT` | PostgreSQL port (Docker) | `5432` |

### Database Setup

#### Option 1: Using Docker Compose (Recommended)

```bash
# Start PostgreSQL container
docker compose up -d

# Push database schema to the database
pnpm run db:push
```

#### Option 2: Using Local PostgreSQL

1. Create a new database:
   ```sql
   CREATE DATABASE urlshortner_db;
   ```

2. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/urlshortner_db
   ```

3. Push the schema:
   ```bash
   pnpm run db:push
   ```

---

## 🚀 Running the Project

### Development Mode (with Hot Reload)

```bash
pnpm run dev
```

The server will start and watch for file changes. Output:
```
Server is up and running on PORT: 3000
```

### Production Mode

```bash
node index.js
```

### Database Management

#### Push Schema to Database
```bash
pnpm run db:push
```

#### Open Drizzle Studio (Visual DB Management)
```bash
pnpm run db:studio
```

Drizzle Studio opens an interactive UI to view and manage your database directly.

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

### User Endpoints

#### 1. User Sign Up
- **Endpoint**: `POST /users/signup`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response** (Success - 200):
  ```json
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Response** (Error - 400):
  ```json
  {
    "error": "User with email: john@example.com already exists."
  }
  ```

#### 2. User Login
- **Endpoint**: `POST /users/login`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response** (Success - 200):
  ```json
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Response** (Error - 401):
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

---

### URL Endpoints

#### 1. Shorten URL
- **Endpoint**: `POST /shorten`
- **Authentication**: Required ✅
- **Request Body**:
  ```json
  {
    "targetURL": "https://www.example.com/very/long/url/path",
    "shortCode": "abc123"  // Optional - if not provided, system generates one
  }
  ```
- **Response** (Success - 200):
  ```json
  {
    "status": "success",
    "urlID": 5,
    "shortCode": "abc123",
    "targetUrl": "https://www.example.com/very/long/url/path"
  }
  ```
- **Response** (Error - 400):
  ```json
  {
    "error": "Error in urls record saving"
  }
  ```

#### 2. Get My URLs
- **Endpoint**: `GET /my-urls`
- **Authentication**: Required ✅
- **Request Body**: None
- **Response** (Success - 200):
  ```json
  [
    {
      "id": 1,
      "shortCode": "abc123",
      "targetUrl": "https://www.example.com/very/long/url/path",
      "userId": 1,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "shortCode": "xyz789",
      "targetUrl": "https://github.com/user/repo",
      "userId": 1,
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ]
  ```
- **Response** (Error - 404):
  ```json
  {
    "error": "There is no registered short URL by this user"
  }
  ```

#### 3. Delete URL
- **Endpoint**: `DELETE /:urlid`
- **Authentication**: Required ✅
- **Request Parameters**: `urlid` (URL ID)
- **Request Body**: None
- **Response** (Success - 200):
  ```json
  {
    "success": "URL deleted successfully."
  }
  ```
- **Response** (Error - 400):
  ```json
  {
    "error": "URL with id: 5 not found! to be deleted"
  }
  ```

#### 4. Redirect to Original URL
- **Endpoint**: `GET /:urlcode`
- **Authentication**: Not required
- **Request Parameters**: `urlcode` (short code)
- **Response** (Success - 301):
  - Redirects to the original URL
  - HTTP Status: 301 (Moved Permanently)
- **Response** (Error - 400):
  ```json
  {
    "error": "URL with short code: abc123 NOT FOUND!"
  }
  ```

---

## 📁 Project Structure

```
CompleteURLShortnerProject-Node&Express/
├── index.js                          # Main application entry point
├── package.json                      # Project dependencies & scripts
├── drizzle.config.js                 # Drizzle ORM configuration
├── docker-compose.yml                # Docker configuration for PostgreSQL
├── .env                              # Environment variables (not in repo)
│
├── DB/
│   └── index.js                      # Database connection setup
│
├── Models/
│   ├── index.js                      # Model exports
│   ├── users.model.js                # User table schema
│   └── urls.model.js                 # URL table schema
│
├── Routes/
│   ├── user.route.js                 # User authentication routes (signup, login)
│   └── urls.routes.js                # URL management routes
│
├── Services/
│   ├── user.service.js               # User business logic
│   └── url.service.js                # URL shortening logic & database operations
│
├── Middlewares/
│   └── auth.middleware.js            # JWT authentication middleware
│
├── Validation/
│   ├── user.validation.js            # User input validation schemas
│   ├── url.validation.js             # URL input validation schemas
│   └── token.validation.js           # Token validation
│
├── Utils/
│   ├── hash.js                       # Password hashing utility
│   └── token.js                      # JWT token creation & verification
│
└── drizzle/                          # Generated migrations (auto-created)
```

---

## 🗄️ Database Schema

### Users Table (`usersTable`)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  salt VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### URLs Table (`urlsTable`)
```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR UNIQUE NOT NULL,
  target_url VARCHAR NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Authentication

### How It Works

1. **User Registration**: 
   - User provides credentials via `/users/signup`
   - Password is hashed with a salt
   - User data is stored in the database
   - JWT token is returned

2. **User Login**:
   - User provides email and password via `/users/login`
   - Password is verified against stored hash
   - JWT token is generated and returned

3. **Protected Routes**:
   - All URL management routes require JWT token
   - Token must be passed in `Authorization: Bearer <token>` header
   - Middleware verifies token authenticity
   - User ID is extracted from token payload

### JWT Token Structure

```
Header: { alg: "HS256", typ: "JWT" }
Payload: { id: 1, email: "user@example.com", iat: 1234567890 }
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

---

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

| Status Code | Meaning |
|-------------|---------|
| **200** | Request successful |
| **301** | URL redirect (permanent) |
| **400** | Bad request / Validation error |
| **401** | Unauthorized / Invalid token |
| **404** | Resource not found |
| **500** | Internal server error |

### Error Response Format
```json
{
  "error": "Descriptive error message"
}
```

---

## 🧪 Testing the API

### Using cURL

#### Sign Up
```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

#### Shorten URL (with token)
```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "targetURL": "https://www.example.com/very/long/url",
    "shortCode": "go"
  }'
```

#### Get My URLs (with token)
```bash
curl -X GET http://localhost:3000/my-urls \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Redirect
```bash
curl -X GET http://localhost:3000/go -L
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for token
3. Create requests with proper authentication headers
4. Test each endpoint systematically

---

## 🔒 Security Considerations

- **Password Hashing**: Passwords are hashed with cryptographic salt before storage
- **JWT Tokens**: Stateless authentication using secure tokens
- **Environment Variables**: Sensitive data (secrets, credentials) stored in `.env`
- **Input Validation**: All inputs validated using Zod schemas
- **HTTPS**: Use HTTPS in production for secure token transmission
- **CORS**: Configure CORS policies as needed for your frontend

### Production Recommendations

1. Use strong `JWT_SECRET` (minimum 32 characters)
2. Enable HTTPS/SSL certificates
3. Implement rate limiting
4. Add logging and monitoring
5. Use environment-specific configurations
6. Implement request timeout limits
7. Add SQL injection prevention (already handled by Drizzle ORM)

---

## 📝 Development Notes

### Adding New Features

1. **Create database schema**: Update `Models/*.model.js`
2. **Push schema**: Run `pnpm run db:push`
3. **Create service**: Add business logic in `Services/`
4. **Create routes**: Add endpoints in `Routes/`
5. **Add validation**: Create Zod schemas in `Validation/`
6. **Add middleware**: Create middleware in `Middlewares/` if needed

### Common Commands

```bash
# Development with hot reload
pnpm run dev

# Push database changes
pnpm run db:push

# Open database studio
pnpm run db:studio

# Run production build
node index.js

# Install new package
pnpm add package-name

# Remove package
pnpm remove package-name
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the `package.json` file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section in this README
2. Review the API documentation
3. Check database logs: `pnpm run db:studio`
4. Enable verbose logging by checking the console output

---

## 🎉 Quick Start Checklist

- [ ] Install Node.js and pnpm
- [ ] Clone the repository
- [ ] Create `.env` file with required variables
- [ ] Run `pnpm install`
- [ ] Start Docker: `docker compose up -d`
- [ ] Push database: `pnpm run db:push`
- [ ] Start dev server: `pnpm run dev`
- [ ] Test API endpoints using cURL or Postman
- [ ] Build amazing shortened URLs! 🚀

---

## 📈 Performance Tips

- Index frequently queried columns (shortCode, userId)
- Implement caching for frequently accessed URLs
- Use connection pooling for database connections
- Monitor database query performance
- Implement pagination for large URL lists

---

**Built with ❤️ using Node.js, Express.js, and PostgreSQL**
