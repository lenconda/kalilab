FROM kalilinux/kali-linux-docker

RUN apt update && apt install openssl ca-certificates xz-utils -y
RUN wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz \
  && xz -d node-v10.15.3-linux-x64.tar.xz \
  && tar -xvf node-v10.15.3-linux-x64.tar \
  && mv node-v10.15.3-linux-x64 /opt/node
ENV PATH /opt/node/bin:$PATH

EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm i pm2 -g
RUN npm i

CMD ["pm2-docker", "start", "--interpreter", "/app/node_modules/.bin/ts-node", "./app/app.ts"]
