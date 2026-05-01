# Frontend README

This frontend is a React app (Create React App) for the Todo application.

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm 9+
- Backend API running locally (default: `http://localhost:5000`)

## Setup

1. Open a terminal in the `frontend` folder.
2. Install dependencies:

```bash
npm install
```

## Run In Development

```bash
npm start
```

- App URL: `http://localhost:3000`
- The page auto-reloads on file changes.

## Build For Production

```bash
npm run build
```

- Output folder: `frontend/build`

## How Frontend Connects To Backend

The API base URL is currently hardcoded in `src/api.js`:

- `http://localhost:5000/api/todos`

If your backend runs on another host/port, update that value.

## Assumptions

- Backend server is running and reachable on `localhost:5000`.
- CORS is enabled by the backend (it is enabled in the current server code).
- MongoDB is available and backend is connected.

## Limitations

- No authentication or user accounts.
- API endpoint is not environment-based yet (hardcoded URL).
- No offline mode or sync conflict handling.
- Validation is basic (title required).
