# Dopamio

Dopamio is a Persian, right-to-left self-help and wellness web app. This repository contains a Django REST API and a React frontend.

## Repository layout

```text
selfhelp/        Django API, settings, and migrations
frontend/     React frontend
requirements.txt Python backend dependencies
.env.example    Safe template for backend environment variables
```

The local Python environment (`vdopamio/`), SQLite database, uploaded media, Node dependencies, ZIP backups, and academic reports are intentionally excluded. The reports include identifying details; review and sanitize them before sharing separately. Uploaded media contains large audio and image files and is not part of the source checkout.

## Requirements

- Python 3.12 recommended
- Node.js LTS and npm
- SQLite for local development (included with Python)

## Local setup

1. Copy `.env.example` to `.env` and set a private `DJANGO_SECRET_KEY`. SMS is disabled by default. Add valid provider credentials only if you intend to send real SMS messages.
2. Create and activate a Python virtual environment, then install the dependencies:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. Create the local database and start Django from the repository root:

   ```bash
   python selfhelp/manage.py migrate
   python selfhelp/manage.py runserver
   ```

4. In another terminal, install and start the frontend:

   ```bash
   cd frontend
   npm ci
   cp .env.example .env
   npm start
   ```

The frontend expects the Django API at `http://127.0.0.1:8000` by default. Set `REACT_APP_API_BASE_URL` in `frontend/.env` to use a different address. The local Django settings use SQLite and an in-memory cache, so they do not require PostgreSQL or Redis.

## Useful commands

- Backend checks: `python selfhelp/manage.py check`
- Frontend production build: `cd frontend && npm run build`
- Frontend tests: `cd frontend && npm test`

## Docker

The API Dockerfile expects the repository root as its build context. Configure production values in a private `.env` file, then build with `docker build -f selfhelp/Dockerfile -t dopamio-api .`. The production API requires a PostgreSQL service reachable at the `POSTGRES_*` values.

## Configuration and safety

- Never commit `.env`, database files, uploaded media, or the local virtual environment.
- SMS delivery is off by default. To enable it, set `KAVE_NEGAR_ENABLE=true`, `KAVE_NEGAR_APIKEY`, and `KAVE_NEGAR_SENDER` in the private root `.env` file.
- The bundled Vazirmatn font and its SIL Open Font License are in `frontend/src/fonts/`.
- No project-wide license is included. This repository is published as a portfolio showcase; reuse of the project code requires permission from the author.

## فارسی

دوپامیو یک برنامهٔ فارسی و راست‌چین برای خودیاری و تندرستی است. این مخزن هم API نوشته‌شده با Django و هم رابط React را دارد. فایل‌های دیتابیس و رسانه‌های بارگذاری‌شده، محیط مجازی پایتون، وابستگی‌های Node، نسخه‌های ZIP و گزارش‌های دارای اطلاعات شناسایی عمداً وارد GitHub نمی‌شوند.

برای راه‌اندازی محلی، ابتدا وابستگی‌های Django را نصب و migrationها را اجرا کنید؛ سپس در پوشهٔ `frontend` دستورهای `npm ci` و `npm start` را بزنید. برای پیامک واقعی باید کلیدهای سرویس را فقط در فایل محلی `.env` تنظیم کنید. برای کد پروژه مجوزی ارائه نشده؛ مخزن برای نمایش در رزومه منتشر شده و استفادهٔ مجدد از کد نیازمند اجازهٔ نویسنده است.
