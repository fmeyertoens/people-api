# people-api

A small TypeScript REST API built with Express and Mongoose.

## Workspace Relationship

This is the REST backend used by the sibling [`../rest-graphql`](../rest-graphql) comparison client. That client sends `GET` requests to this server's `/events` endpoint and expects an array of event objects. Its local REST URI is `http://localhost:5000/events`.

The sibling [`../graphql-server`](../graphql-server) project exposes similar event and user concepts through GraphQL at `/api`. It is a separate server, not a proxy or runtime dependency of this API. In the Compose stack, both backends use the same `MONGO_URI` and query the same persisted data.

### Local integration

To use the comparison client's built-in local settings, set `PORT=5000` and `MONGO_URI`, start this API, start the GraphQL server separately on port 8000, and run the frontend. If another port is used, update the REST URI through the frontend Settings dialog. The parent `rest-graphql-comparison` repository provides a Docker Compose stack with a local MongoDB container.

## What This Project Is About

This project is an early-stage API scaffold centered around **events** and **users**.

- The API currently exposes event-related endpoints.
- Event data can be read from MongoDB or from a local JSON mock file.
- User data is modeled in MongoDB but user routes/controllers are not implemented yet.

In short: this is the backend foundation for an event/people app where users can create and manage events.

## Tech Stack

- Node.js
- TypeScript
- Express
- Mongoose (MongoDB)
- dotenv + envalid for environment configuration
- CORS + JSON body parsing middleware

## Project Structure

- `src/server.ts`: Entry point. Loads env, validates env vars, creates app instance, starts server.
- `src/app.ts`: Express app setup, middleware registration, controller registration, MongoDB connection.
- `src/interfaces/controller.interface.ts`: Shared controller contract (`path` + `router`).
- `src/events/event.controller.ts`: Event endpoints.
- `src/events/event.model.ts`: Mongoose Event schema/model.
- `src/events/event.interface.ts`: Event TypeScript interface.
- `src/events/event-mock-100.json`: Local mock events used by one endpoint.
- `src/users/user.model.ts`: Mongoose User schema/model.
- `src/users/user.interface.ts`: User TypeScript interface.
- `src/utils/validateEnv.ts`: Runtime env var validation.

## How It Works

1. `server.ts` loads environment variables via `dotenv/config`.
2. `validateEnv()` ensures required values are present.
3. `App` initializes:
   - MongoDB connection
   - middleware (`bodyParser.json()`, `cors()`)
   - registered controllers
4. `EventsController` exposes the event endpoints under `/events`.

## API Endpoints

### `GET /events`

Returns all events from MongoDB.

### `GET /eventsLocal`

Returns a static list of mock events from `event-mock-100.json`.

### `PATCH /events/:id`

Updates an event in MongoDB by ID using the request body.
Returns the updated document.

## Data Models

### Event

- `title: string` (required)
- `description: string` (required)
- `price: number` (required)
- `date: Date` (required)
- `creator: ObjectId` (reference to `User`)

### User

- `email: string` (required)
- `password: string` (required)
- `name: string` (required)
- `createdEvents: ObjectId[]` (references `Event`)

## Environment Variables

Required variables (validated at startup):

- `PORT`
- `MONGO_URI`

For example:

`mongodb://username:password@host:27017/events?authSource=admin`

## Scripts

From `package.json`:

- `npm run dev` — runs the server with `ts-node` (`src/server.ts`)
- `npm run build` — compiles TypeScript into `dist`
- `npm run start` — runs compiled output (`dist/server.js`)

## Health check

`GET /health` returns a successful status when the HTTP server is running. Docker Compose uses this endpoint to determine whether the service is ready.

## Current Status / Gaps

This is a good scaffold, but not production-ready yet. Notable gaps:

- no user routes/controllers yet
- no authentication/authorization
- minimal error handling
- no request validation layer
- no automated tests

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with the required variables.

3. Run in development:

```bash
npm run dev
```
