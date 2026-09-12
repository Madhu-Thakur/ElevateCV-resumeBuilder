# Resume Builder — Frontend (client)

Next.js (App Router) frontend for the **Resume Builder** application.

Built with:

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Bootstrap 5](https://getbootstrap.com/) (loaded globally in `src/app/layout.js`)
- [React Compiler](https://react.dev/learn/react-compiler) (enabled in `next.config.mjs`)

## Project Structure

```
client/
├── src/
│   ├── app/               # App Router routes
│   │   ├── page.js        # Home page
│   │   ├── layout.js      # Root layout (loads Bootstrap + fonts)
│   │   ├── globals.css    # Global CSS
│   │   ├── mode/          # Entry-mode selection
│   │   ├── builder/       # Guided resume builder (wizard + preview)
│   │   ├── templates/     # Template gallery (sample-data previews)
│   │   ├── resumes/       # Resume dashboard (list/edit/delete)
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   ├── features/      # Feature overview page
│   │   └── help/          # Help page
│   ├── components/
│   │   ├── builder/       # WizardContainer (step orchestration)
│   │   ├── sections/      # Personal, Summary, Education, Experience,
│   │   │                  #   Skills, Projects, Certifications,
│   │   │                  #   Achievements, Languages, Interests (+Additional)
│   │   ├── templates/     # Classic, ModernSidebar, MinimalATS, Creative,
│   │   │                  #   Executive, Compact, CardLayout, GridLayout
│   │   ├── auth/          # ProtectedRoute (auth guard)
│   │   ├── common/        # Navbar
│   │   ├── ResumePreview.js      # Live preview (also used for PDF)
│   │   ├── ResumePrintPortal.js  # Print-only portal for PDF export
│   │   ├── ResumeScore.js        # Completeness/quality score + feedback
│   │   └── CustomizationPanel.js # Fonts, colors, section order
│   ├── context/
│   │   ├── AuthContext.js    # JWT auth state (localStorage token)
│   │   └── ResumeContext.js  # Resume draft state + persistence
│   ├── services/
│   │   └── api.js         # fetch wrapper + auth/resume/AI functions
│   └── utils/
│       ├── dataMapper.js     # Backend <-> frontend resume mapping
│       ├── customization.js  # Fonts, section order, style helpers
│       ├── pdf.js            # PDF/print helpers
│       └── resumeScore.js    # Score calculation
├── eslint.config.mjs  # ESLint configuration (eslint-config-next)
├── jsconfig.json      # Path alias: @/* -> ./src/*
├── next.config.mjs    # Next.js configuration (React Compiler enabled)
├── package.json
└── .gitignore
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | No (defaults to `http://localhost:5000`) | Backend API base URL used by `src/services/api.js` |

Set it in a local `.env.local` (not committed) when the backend runs on a non-default URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start dev server (hot reload)     |
| `npm run build`   | Create an optimized production build |
| `npm run start`   | Run the production build          |
| `npm run lint`    | Run ESLint                        |

## Major Features

- **Guided builder** (`app/builder` + `WizardContainer`): step-by-step sections with validation.
- **Live preview** (`ResumePreview`): renders the current draft in the selected template.
- **PDF export** (`ResumePrintPortal` + `utils/pdf.js`): print-based export of the exact preview.
- **Templates** (`components/templates`): 8 designs switchable in the builder and browsable at `/templates`.
- **Customization** (`CustomizationPanel`): fonts, colors, section order; shared with preview/PDF.
- **Resume dashboard** (`app/resumes`): list, edit, delete persisted resumes via `services/api.js`.
- **AI summary** (`sections/SummarySection` → `POST /api/ai/summary`): inserts generated text into the draft.
- **Resume score** (`ResumeScore` + `utils/resumeScore.js`): completeness/quality feedback.
- **Auth** (`AuthContext` + `ProtectedRoute`): JWT login/register with route guards.

## Backend

The frontend expects the Express + MongoDB API from the sibling [`../server`](../server) folder.

## 📌 Notes

- Bootstrap CSS is imported globally in `src/app/layout.js`, so all Bootstrap utility classes are available everywhere.
- The `@/*` path alias can be used for imports, e.g. `import { x } from "@/components/x"`.
