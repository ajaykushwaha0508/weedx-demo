#!/bin/bash
export PORT=3000
# Start the PM2 server
pm2 start server.js --name weedx

# Keep the container running
pm2 logs