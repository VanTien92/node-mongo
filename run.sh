#!/bin/bash

# Create the config for the majority of apps
python /usr/src/badger/bin/fetch_config.py "$HOME/properties.json"

# Run app
npm start