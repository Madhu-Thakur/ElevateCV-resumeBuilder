# Resume Builder — Backend (server)

Node.js + Express.js REST API for the **Resume Builder** application, backed by MongoDB.

Built with Node.js, Express 5, Mongoose (MongoDB ODM), JWT + bcryptjs (auth), CORS, dotenv, express-validator, OpenAI SDK, and Swagger (swagger-jsdoc + swagger-ui-express). Nodemon is used for development only.

## Actual Project Structure

```
server/
├── config/            # db.js (MongoDB connect), openai.js (OpenAI client)
├── controllers/       # authController, resumeController, aiController
├── docs/              # swagger.js (OpenAPI/Swagger spec config)
├── middleware/        # authMiddleware, validationMiddleware, errorMiddleware
├── models/            # User, Resume (Mongoose schemas)
├── routes/            # authRoutes, resumeRoutes, aiRoutes
├── validators/        # authValidator, resumeValidator (express-validator)
├── app.js             # Express app setup, routes, health check, Swagger UI
├── server.js          # Entry point — loads .env, connects DB, starts server
├── .env               # Local environment variables (not committed)
├── .env.example       # Placeholder env template (committed)
├── package.json
└── .gitignore
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in this folder from the committed template:

```bash
copy .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_strong_random_secret_here
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | No (defaults to `5000`) | HTTP port |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | JWT signing secret (use a long random value) |
| `OPENAI_API_KEY` | Only for AI summary | OpenAI API key |
| `OPENAI_MODEL` | No (defaults to `gpt-4o-mini`) | Summary model override |

Start the development server:

```bash
npm run dev
```

Or run in production:

```bash
npm start
```

## 📜 Available Scripts

| Script         | Description                              |
| -------------- | ---------------------------------------- |
| `npm run dev`  | Start server with nodemon (auto-restart) |
| `npm start`    | Start server with node                   |

## API Endpoints

| Method | Endpoint | Auth | Description |
| ------ | -------- | ---- | ----------- |
| `GET` | `/api/health` | No | Health check for the API |
| `POST` | `/api/auth/register` | No | Register (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | No | Login, returns JWT `token` + `user` |
| `GET` | `/api/auth/profile` | Yes | Logged-in user profile |
| `POST` | `/api/resumes` | Yes | Create resume (`title` required) |
| `GET` | `/api/resumes` | Yes | List logged-in user's resumes |
| `GET` | `/api/resumes/:id` | Yes | Get one resume (owner only) |
| `PUT` | `/api/resumes/:id` | Yes | Update resume (whitelisted fields only) |
| `DELETE` | `/api/resumes/:id` | Yes | Delete resume (owner only) |
| `POST` | `/api/ai/summary` | Yes | Generate AI summary from resume data |

## API Behavior Notes

- Auth uses `Authorization: Bearer <token>` (see `middleware/authMiddleware.js`).
- All resume routes are owner-scoped via `userId`.
- `PUT /api/resumes/:id` only applies whitelisted fields (`ALLOWED_UPDATE_FIELDS` in `controllers/resumeController.js`).
- `POST /api/ai/summary` requires meaningful data in at least one of skills, experience, or projects, then calls the OpenAI Responses API (`OPENAI_MODEL` or `gpt-4o-mini`).

## Swagger

Interactive API documentation is served at [http://localhost:5000/api-docs/](http://localhost:5000/api-docs/) when the server is running (see `docs/swagger.js`).

## Frontend

The Next.js frontend lives in the sibling [`../client`](../client) folder and runs on [http://localhost:3000](http://localhost:3000).
