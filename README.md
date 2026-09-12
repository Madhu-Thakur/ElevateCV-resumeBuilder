# Resume Builder v2

A full-stack **Resume Builder** application with guided resume creation, live preview, PDF export, multiple templates, customization, AI-powered summary generation, and resume scoring.

## Main Features

- **Guided resume builder** — step-by-step wizard (personal info, summary, education, experience, skills, projects, certifications, achievements, languages, interests)
- **Live resume preview** — updates as you type
- **PDF export** — print-based export of the exact preview (A4, via a dedicated print portal)
- **8 resume templates** — Classic, Modern Sidebar, Minimal ATS, Creative, Executive, Compact, Card Layout, Grid Layout
- **Customization** — typography (font family/size), brand colors, section ordering
- **Resume dashboard** — create, edit, reload, save, and delete resumes (MongoDB persistence)
- **AI summary generation** — OpenAI-powered professional summary from skills/experience/projects
- **Resume scoring** — completeness/quality score with actionable feedback
- **Authentication** — JWT-based register/login with protected routes
- **Template gallery** — browse templates with sample-data previews before building

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Bootstrap 5, React Compiler |
| Backend | Node.js, Express 5, Mongoose (MongoDB), JWT + bcryptjs, express-validator |
| AI | OpenAI Responses API (`gpt-4o-mini` by default, overridable via `OPENAI_MODEL`) |
| API docs | Swagger UI (`swagger-jsdoc` + `swagger-ui-express`) |
| Dev tools | ESLint (`eslint-config-next`), Nodemon |

## Architecture

```
resume-bulder-v2/
├── client/            # Next.js frontend (App Router)
│   └── src/
│       ├── app/       # Routes: /, /mode, /builder, /templates,
│       │              #   /features, /help, /login, /register, /resumes
│       ├── components/# builder wizard, sections, templates,
│       │              #   preview, print portal, score, customization
│       ├── context/   # AuthContext, ResumeContext
│       ├── services/  # api.js (fetch wrapper + endpoint functions)
│       └── utils/     # dataMapper, customization, pdf, resumeScore
├── server/            # Express + MongoDB backend
│   ├── routes/        # authRoutes, resumeRoutes, aiRoutes
│   ├── controllers/   # authController, resumeController, aiController
│   ├── models/        # User, Resume (Mongoose schemas)
│   ├── middleware/    # auth, validation, error handler
│   ├── validators/    # express-validator chains
│   ├── config/        # db.js (Mongoose connect), openai.js (client)
│   └── docs/          # swagger.js (OpenAPI spec config)

## Local Setup

### Prerequisites

- Node.js 18+ and npm
- A MongoDB database (local `mongod` or MongoDB Atlas)
- An OpenAI API key (only required for AI summary generation)

### 1. Backend

```bash
cd server
npm install
copy .env.example .env
```

Then edit `.env` (see Environment variables below) and start the server:

```bash
npm run dev
```

Backend runs on http://localhost:5000/.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on http://localhost:3000/. The backend must be running for login, resume persistence, and AI features.

## Environment Variables

Create `server/.env` locally from `server/.env.example` (never commit `.env`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_strong_random_secret_here
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | No (defaults to `5000`) | Backend HTTP port |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign JWT tokens (use a long random value) |
| `OPENAI_API_KEY` | Only for AI summary | OpenAI API key |
| `OPENAI_MODEL` | No (defaults to `gpt-4o-mini`) | Override for the summary model |

Frontend (`client/`):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | No (defaults to `http://localhost:5000`) | Backend API base URL |

## How to Start

| What | Command | URL |
|---|---|---|
| Backend (dev) | `cd server && npm run dev` | http://localhost:5000/ |
| Backend (prod) | `cd server && npm start` | http://localhost:5000/ |
| Frontend (dev) | `cd client && npm run dev` | http://localhost:3000/ |
| Frontend (prod) | `cd client && npm run build && npm start` | http://localhost:3000/ |
| Frontend lint | `cd client && npm run lint` | — |

## Backend API Overview

Interactive docs (when the server is running): http://localhost:5000/api-docs/

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | Health check |
| `POST` | `/api/auth/register` | No | Register (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | No | Login, returns JWT `token` + `user` |
| `GET` | `/api/auth/profile` | Yes | Logged-in user profile |
| `POST` | `/api/resumes` | Yes | Create resume (`title` required) |
| `GET` | `/api/resumes` | Yes | List logged-in user's resumes |
| `GET` | `/api/resumes/:id` | Yes | Get one resume (owner only) |
| `PUT` | `/api/resumes/:id` | Yes | Update resume (whitelisted fields only) |
| `DELETE` | `/api/resumes/:id` | Yes | Delete resume (owner only) |
| `POST` | `/api/ai/summary` | Yes | Generate AI summary from resume data |

Auth uses `Authorization: Bearer <token>`. Resume updates accept only: `title`, `personalInfo`, `summary`, `education`, `experience`, `skills`, `projects`, `certifications`, `achievements`, `languages`, `interests`, `sectionOrder`, `typography`, `customColors`, `template`.

## PDF Export Behavior

- The builder export button opens the browser print dialog scoped to a hidden print portal (`ResumePrintPortal`) that renders the same `ResumePreview` component, so the PDF matches the on-screen preview.
- Templates are designed around an A4 width (794px); font-size scaling reflows text without breaking the page width.
- No server-side PDF rendering is involved — export works fully client-side through the print pipeline.

## Resume Templates

Available in the builder and the `/templates` gallery: Classic (default), Modern Sidebar, Minimal ATS, Creative, Executive, Compact, Card Layout, Grid Layout. The gallery renders each template with built-in sample data so designs can be compared before building.

## Resume Customization

Via the `CustomizationPanel`: font family (Arial, Georgia, Times New Roman, Verdana, Trebuchet MS), font size (Small/Medium/Large), primary/secondary brand colors, and section reordering. Customization applies to both the live preview and the PDF export.

## AI Summary Generation

In the Summary step, **Generate with AI** sends the current name/skills/experience/education/projects to `POST /api/ai/summary`. The backend requires at least one of skills, experience, or projects to contain meaningful data, then calls the OpenAI Responses API and returns a concise 3–4 sentence third-person summary.

## Resume Scoring

`ResumeScore` computes a completeness/quality score from filled sections (contact info, summary length, education, experience, skills, projects, and more) and shows per-section feedback.

## Deployment Overview

- **Backend:** deploy `server/` to any Node host; set `PORT`, `MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) as environment variables; expose `/api/*` and `/api-docs` (restrict docs if desired).
- **Frontend:** deploy `client/` to any Next.js host; set `NEXT_PUBLIC_API_BASE_URL` to the public backend URL; run `npm run build && npm start`.
- **Never commit** `server/.env` — it stays local-only (see `.gitignore`).

├── .gitignore
└── README.md
```

- **Frontend to backend:** the client talks to the API through `client/src/services/api.js`, a thin `fetch` wrapper that attaches the JWT (`Bearer <token>` from `localStorage`) and throws typed errors. Base URL comes from `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:5000`).
- **Backend to database:** Mongoose models (`User`, `Resume`); every resume is scoped to the logged-in user (`userId`), and updates go through an explicit `ALLOWED_UPDATE_FIELDS` whitelist.
- **AI flow:** SummarySection calls `POST /api/ai/summary`, which uses the OpenAI Responses API and returns text inserted into the summary field.
- **PDF flow:** `ResumePrintPortal` renders `ResumePreview` into a print-only portal; export uses the browser print pipeline restricted to that portal.
