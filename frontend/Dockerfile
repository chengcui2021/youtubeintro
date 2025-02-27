# frontend/Dockerfile

# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY frontend/package.json frontend/yarn.lock ./

# Install frontend dependencies using Yarn
RUN yarn install --production

# Copy the frontend source code into the container
COPY frontend/ .

# Expose the frontend development port
EXPOSE 3000

# Set the environment variables for production
ENV NODE_ENV=production

# Build the frontend
RUN yarn build

# Start the frontend server
CMD ["yarn", "start"]
