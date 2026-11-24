FROM python:3.12-slim

WORKDIR /app
ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=selfhelp.settings.production

COPY requirements.txt requirements-production.txt ./
RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements-production.txt

COPY selfhelp/ ./selfhelp/
EXPOSE 8080
CMD ["uwsgi", "--ini", "/app/selfhelp/uwsgi.ini"]
