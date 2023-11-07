# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm install 

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container listens on the specified network port at runtime.
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "index.js"]
