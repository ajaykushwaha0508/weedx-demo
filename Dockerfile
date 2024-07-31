# Build Stage
FROM node:21 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application (optional, if you have a build step)
RUN npm run build

# Run Stage
FROM node:21

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Expose the port the app runs on
EXPOSE 3000

# Copy the bash script to start the PM2 server
COPY start.sh /usr/src/app/start.sh

# Give execution rights on the start.sh script
RUN chmod +x /usr/src/app/start.sh

# Define the command to run the bash script
CMD ["/usr/src/app/start.sh"]