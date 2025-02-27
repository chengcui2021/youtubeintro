# backend/Dockerfile

# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY backend/package.json backend/yarn.lock ./

# Install backend dependencies using Yarn
RUN yarn install --production

# Copy the backend source code into the container
COPY backend/ .

# Expose the backend API port
EXPOSE 3001

# Set the environment variables for production
ENV NODE_ENV=production

# Start the backend server
CMD ["yarn", "start"]
