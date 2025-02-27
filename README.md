
# YouTube Intro API

This project provides an API for generating YouTube video intros. It is built using TypeScript, Node.js, and Express.

## Demo

You can access the demo of the YouTube Intro API on Heroku:

[Heroku Demo Link](https://youtubeintro-7f5709bf1c04.herokuapp.com/)

## Features

- Generate YouTube video intros.
- Easy setup with Docker.
- Deployable on platforms like Heroku.

## Local Development Setup

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/chengcui2021/youtubeintro.git
cd youtubeintro-api
```

### 2. Set up environment variables

Create a `.env` file in the root of the project (this will be ignored by Git).

Example `.env` file:

```bash
OPENAI_API_KEY=your-openai-api-key
PORT=3001
```

Make sure to replace `your-openai-api-key` with your actual OpenAI API key.

### 3. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 4. Start the app locally

Run the app in development mode:

```bash
npm run dev
```

This will start the server on port `3001` (or whatever port you've specified in `.env`).

You can now access the API at:

```bash
http://localhost:3001/api/generateIntro
```

## Docker Setup

To run the application in a Docker container, follow these steps:

### 1. Install Docker

If you don't already have Docker installed, follow the installation instructions from [Docker's website](https://www.docker.com/get-started).

### 2. Build and start the Docker containers

Make sure you have a `.env` file for your environment variables as mentioned earlier.

Now, you can run the following commands to start the application with Docker:

```bash
docker-compose up --build
```

This command will:

1. Build the Docker image based on the `Dockerfile`.
2. Start the containerized app.

You can access the API at:

```bash
http://localhost:3001/api/generateIntro
```

### 3. Stop the Docker containers

To stop the Docker containers, run:

```bash
docker-compose down
```
