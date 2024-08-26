#!/bin/bash
export PORT=3000
# Start the PM2 server
pm2 start npm --name "weedx" -- start

# Keep the container running
pm2 logs