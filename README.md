
# eg-api

---

**eg-api** is a NestJS-based backend service, written in TypeScript, designed for scalable and modular development. It provides **user authentication** with **JWT (JSON Web Token)** to ensure secure access control, alongside features for **user management** and database services using **Mongoose** for MongoDB integration.

---

## Repository

You can find the repository here: [https://github.com/msherazy/eg-api](https://github.com/msherazy/eg-api)

---

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/msherazy/eg-api.git
   cd eg-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file with the following content:

   ```bash
   DB_URI=mongodb+srv://admin:rXtxqCzXfn9blhWB@cluster0.esyfc.mongodb.net/eg_server?retryWrites=true&w=majority&appName=Cluster0
   DB_NAME=eg_server
   ACCESS_TOKEN_SECRET=3457c6ae2dab0252ca71f83e3e26f2277d5bebac851791257464c69e89f39f21805a45f40ef7b63f422a78531d8e18c8ae66a39e9053ea6d518da367aced1b19
   ACCESS_TOKEN_EXPIRY=3600s
   ```

---

## Compile and Run the Project

### Development Mode

To start the project in development mode with live reloading:

```bash
npm run start
```

### Production Mode

To build and run the project in production:

```bash
npm run build
npm run start:prod
```

---

## User Authentication with JWT

This service implements **JWT-based authentication** for user login and access control. The following endpoints are provided for authentication:

- **Register User:**  
  `POST /auth/register`  
  Allows new users to register.

- **Login User:**  
  `POST /auth/login`  
  Authenticates users and returns a JWT token on success.

- **Protected Route Example:**  
  `GET /user/profile`  
  Requires a valid JWT token to access user profile information.

Make sure to add the JWT token in the `Authorization` header for secured routes:

```http
Authorization: Bearer <token>
```

---

## Database Configuration

This project uses **MongoDB** with **Mongoose** for database operations. The MongoDB connection string and other database settings are managed through environment variables:

- **DB_URI:** MongoDB connection string.
- **DB_NAME:** Name of the database used in the application.

The connection settings are loaded from the `.env` file to ensure secure access.

---

---

## Project Structure

```plaintext
eg-api/
│
├── src/                     # Source files
│   ├── auth/                # Authentication module (JWT-based)
│   ├── common/              # Common utilities and helpers
│   ├── database/            # Database configurations and services (Mongoose)
│   ├── user/                # User module
│   └── app.controller.ts    # Main application controller
│   └── app.module.ts        # Root application module
│   └── main.ts              # Entry point of the application
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── README.md                # Project documentation
```

