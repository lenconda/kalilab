#!/bin/bash

npm run init
pm2-docker start --interpreter /app/node_modules/.bin/ts-node ./app/app.ts
