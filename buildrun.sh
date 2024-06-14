#!/bin/bash

# Navigate to the frontend directory and build the project
echo "Building the frontend..."
cd ./frontend/
npm run build

# Navigate to the backend directory and start the server
echo "Starting the backend server..."
cd ../backend/
node server.js