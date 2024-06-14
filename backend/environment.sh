#!/bin/bash

# Path to your .env file
ENV_PATH="/root/svelte-aoof-ca/backend/.env"

# Check if the .env file exists
if [ -f "$ENV_PATH" ]; then
    # Export the variables in the .env file
    export $(cat "$ENV_PATH" | sed 's/#.*//g' | xargs)
else
    echo "$ENV_PATH does not exist."
fi