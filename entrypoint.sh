#!/bin/bash

pm2-docker start --interpreter /app/node_modules/.bin/ts-node /app/app/app.ts
