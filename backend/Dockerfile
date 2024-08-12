# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Install nodemon globally inside container for live-reloading
RUN npm install -g nodemon

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["npm", "run", "server"]