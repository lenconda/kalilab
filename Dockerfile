FROM kalilinux/kali-linux-docker

RUN sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com ED444FF07D8D0BF6 && \
  apt update && \
  apt install openssl ca-certificates xz-utils \
  ace-voip amap apt2 automater braa cisco-torch dmitry dnsenum dnsmap dnsrecon dnstracer \
  dnswalk enum4linux fierce goofile  hping3 ident-user-enum masscan nmap parsero sslstrip \
  sslyze theharvester unicornscan bed doona oscanner sqlmap blindelephant davtest fimap \
  grabber hurl joomscan ua-tester whatweb wpscan -y

EXPOSE 3000

WORKDIR /app
RUN chmod 777 /app
COPY . .

RUN npm i pm2 -g
RUN npm i

CMD ["pm2-docker", "start", "--interpreter", "/app/node_modules/.bin/ts-node", "./app/app.ts"]
