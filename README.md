# Node with Sequelize ORM

A simple Node.js authentication API built with Express, Sequelize and PostgreSQL. This repository provides user registration, login, protected user fetching, and user update functionality using JWT-based authentication.

## Features

- Express server (`app.js`)
- PostgreSQL database connection via Sequelize
- User registration with validation and password hashing
- Login with email/password and JWT token generation
- Protected routes using `x-access-token`
- User model with `username`, `email`, `password`, `bio`, and `role`

## Prerequisites

- Node.js installed (v16 or newer recommended)
- PostgreSQL installed and running
- `npm` available
- A PostgreSQL database created for this project

## Project structure

- `app.js` - Express server and route registration
- `package.json` - dependencies and scripts
- `DB/db_connection.js` - Sequelize database configuration
- `Models/user.js` - Sequelize User model
- `Controller/authController.js` - register and login logic
- `Controller/userController.js` - protected user APIs
- `Middleware/authMiddleware.js` - JWT authentication middleware
- `Routers/authRoutes.js` - auth endpoints
- `Routers/userRoutes.js` - protected user endpoints
- `helpers/site_helper.js` - JWT token generation and verification

## Environment variables

Create a `.env` file in the project root with the following values:

```env
DB_NAME=your_database_name
USER=your_database_username
PASSWORD=your_database_password
HOST=your_database_host
JWTSECRET=your_jwt_secret
PORT=5000
```

Example:

```env
DB_NAME=myappdb
USER=postgres
PASSWORD=postgrespass
HOST=localhost
JWTSECRET=supersecretkey
PORT=5000
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
```

2. Navigate into the project folder:

```bash
cd "d:\new project\Docker\Node-with-sequelize-orm"
```

3. Install dependencies:

```bash
npm install
```

4. Create the `.env` file with the values shown above.

## Running the application

Start the server in development mode:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The server will listen on the port from `PORT` in `.env` or default to `5000`.

## API Routes

### Auth routes

#### Register user

- URL: `POST /api/auth/register`
- Body (JSON):

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user",
  "password": "password123",
  "cpassword": "password123",
  "bio": "Optional bio text"
}
```

- Response:
  - `status: sucess` on success
  - created user data

#### Login

- URL: `POST /api/auth/login`
- Body (JSON):

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- Response:
  - `status: success` on success
  - `token` returned in the body
  - `user_data` returned

### Protected routes

These routes require `x-access-token` header with the token returned from login.

#### Get admin users

- URL: `GET /api/get-users`
- Headers:
  - `x-access-token: <token>`

- Response: list of users with role `admin`

#### Update user details

- URL: `POST /api/update-user`
- Headers:
  - `x-access-token: <token>`
- Body (JSON):

```json
{
  "user_id": "your-user-id",
  "bio": "Updated bio text"
}
```

- Response: success message and affected row count

## Notes

- The application uses Sequelize `sync({ force: false, alter: true })` to update the database schema automatically.
- Make sure your PostgreSQL credentials and host values are correct in `.env`.
- The token is expected in the `x-access-token` header for protected routes.

## Clone and use

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
```

2. Change directory:

```bash
cd "d:\new project\Docker\Node-with-sequelize-orm"
```

3. Install dependencies:

```bash
npm install
```

4. Create and configure `.env`.

5. Run the server:

```bash
npm start
```

6. Use Postman, curl, or any API client to call the endpoints.

## Example curl commands

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"john","email":"john@domain.com","role":"user","password":"password123","cpassword":"password123"}'
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"john@domain.com","password":"password123"}'
```

Fetch users:

```bash
curl -X GET http://localhost:5000/api/get-users \
  -H 'x-access-token: YOUR_TOKEN_HERE'
```

Update user:

```bash
curl -X POST http://localhost:5000/api/update-user \
  -H 'Content-Type: application/json' \
  -H 'x-access-token: YOUR_TOKEN_HERE' \
  -d '{"user_id":"USER_ID","bio":"Updated bio"}'
```
