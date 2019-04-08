#!/bin/bash

chmod 777 /app
cd /app

npm install && \
  pm2-docker start --interpreter=./node_modules/.bin/ts-node app/app.ts --name kalilabs
