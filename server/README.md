# Backend README

This backend is an Express + MongoDB API for the Todo application.

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm 9+
- MongoDB (local MongoDB instance or MongoDB Atlas)

## Setup

1. Open a terminal in the `server` folder.
2. Install dependencies:

```bash
npm install
```

3. Create/update `.env` in the `server` folder.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
```

## Run In Development

```bash
npm run dev
```

- Starts server with nodemon.
- API base URL: `http://localhost:5000/api/todos`

## Run In Production Mode

```bash
npm start
```

## MongoDB Connection Notes

The server reads `MONGO_URI` from environment variables and connects with Mongoose.

- Local MongoDB example:
  - `mongodb://127.0.0.1:27017/todo_app`
- MongoDB Atlas example:
  - `mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority`

Tips:

- In Atlas, allow your IP address in Network Access.
- Create a DB user with read/write permissions for your database.
- Keep credentials in `.env`; do not hardcode them in source files.

## Available Endpoints (Current)

- `GET /api/todos` - list todos
- `POST /api/todos` - create todo
- `PUT /api/todos/:id` - update todo
- `PATCH /api/todos/:id/done` - toggle completion
- `DELETE /api/todos/:id` - delete todo

## Assumptions

- `.env` exists with valid `PORT` and `MONGO_URI`.
- MongoDB is reachable from the machine running this server.
- Frontend calls this backend at `http://localhost:5000`.

## Limitations

- No authentication/authorization.
- No request rate limiting.
- Minimal input validation.
- Single-node MongoDB usage assumptions (no advanced replica/sharding notes in this project).
