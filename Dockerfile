# Use an official Node.js 21 runtime as a parent image
FROM node:21

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Run Build
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Copy the bash script to start the PM2 server
COPY start.sh /usr/src/app/start.sh

# Give execution rights on the start.sh script
RUN chmod +x /usr/src/app/start.sh

# Define the command to run the bash script
CMD ["/usr/src/app/start.sh"]