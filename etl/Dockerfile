# Start with a Python 3.11 image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies needed by Playwright for browser operations
RUN apt-get update && apt-get install -yq libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3 libxss1

# Copy the dependency file and install the Python libraries using Poetry
COPY pyproject.toml ./
RUN pip install --no-cache-dir poetry
RUN poetry config virtualenvs.create false && poetry install --no-dev --no-interaction --no-ansi

# Install the browsers needed by Playwright
RUN playwright install