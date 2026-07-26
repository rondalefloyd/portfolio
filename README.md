# Rondale Bufete - Developer Portfolio

A recruiter-facing portfolio for Rondale Bufete, built with Next.js, Material UI, FastAPI, SQLAlchemy, and Supabase Postgres.

## Stack

- **Frontend:** Next.js App Router, TypeScript, Material UI, Emotion
- **Backend:** Python, FastAPI, SQLAlchemy 2, Alembic
- **Database:** Supabase Postgres (optional for the initial portfolio; used by the contact form)
- **Deployment:** Vercel for the frontend and backend

## Run locally

### Prerequisites

- Node.js 20+
- Python 3.11+
- A Supabase project if you want contact messages persisted

### 1. Start the backend

PowerShell:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
# Edit .env and set DATABASE_URL when using Supabase.
uvicorn app.main:app --reload --port 8000
```

The API is available at http://localhost:8000 and its interactive docs are at http://localhost:8000/docs.

If PowerShell blocks activation, run `Set-ExecutionPolicy -Scope Process Bypass` first, or run `venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000` without activating.

### 2. Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
# Edit NEXT_PUBLIC_API_URL if your backend is not on localhost:8000.
npm run dev
```

Open http://localhost:3000.

### 3. Optional database setup

Create a Supabase project, copy its **direct Postgres connection string**, and put it in `backend/.env` as `DATABASE_URL`. Use the SQLAlchemy format:

```text
postgresql+psycopg://postgres:[PASSWORD]@[HOST]:5432/postgres
```

Then run:

```powershell
cd backend
alembic upgrade head
```

The contact endpoint also works without a database and returns a helpful configuration error only when persistence is requested. Never commit `.env` files or Supabase service-role keys.

## Deploying

### Frontend - Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repository and set the project root directory to `frontend`. The root `vercel.json` is configured for that root directory. Use build command `npm run build`, install command `npm install`, and leave the output directory blank.
3. Vercel detects Next.js automatically.
4. Add `NEXT_PUBLIC_API_URL` pointing to the deployed backend.
5. Deploy and add your custom domain if desired.

### Backend - Vercel

1. Create a separate Vercel project for the backend.
2. Set the root directory to `backend`.
3. Add `DATABASE_URL` with your Supabase Postgres connection string.
4. Add `FRONTEND_ORIGIN` with the frontend Vercel URL.
5. Add `GEMINI_API_KEY` with your replacement Gemini key.
5. Deploy the backend.
6. Run `alembic upgrade head` from a local environment or CI/CD step against the production database. Vercel does not automatically run Alembic migrations.

## Environment variables

### Frontend (`frontend/.env.local`)

```text
NEXT_PUBLIC_API_URL=http://localhost:8000
```

`GEMINI_API_KEY` is used only by the FastAPI `/chat` route and must not use the `NEXT_PUBLIC_` prefix. Add it to `backend/.env` locally and to the backend deployment’s environment variables. The frontend only needs `NEXT_PUBLIC_API_URL`.

### Backend (`backend/.env`)

```text
DATABASE_URL=postgresql+psycopg://postgres:password@host:5432/postgres
FRONTEND_ORIGIN=http://localhost:3000
GEMINI_API_KEY=your-server-side-gemini-key
```

## What I need from you to deploy

I do not need credentials to prepare or review the code. To deploy into your accounts, you would need to either deploy it yourself using the steps above or provide an approved deployment path. Do not send passwords, Supabase service-role keys, or personal access tokens in chat. The safest approach is for you to connect GitHub to Vercel and add environment variables directly in the dashboard. If you want me to perform the deployment, provide access through the provider's supported connection flow.

## Project structure

```text
frontend/   Next.js + Material UI portfolio
backend/    FastAPI + SQLAlchemy API
```
