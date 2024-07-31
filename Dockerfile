# Use Node.js 21 as the base image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy the build directory, server.js, start.sh, node_modules, package.json, package-lock.json, and public directory
COPY build ./build
COPY server.js ./server.js
COPY start.sh ./start.sh
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY public ./public

# Make start.sh executable
RUN chmod +x start.sh

# Expose the port your application runs on
EXPOSE 3000

# Run the start.sh script
CMD ["./start.sh"]