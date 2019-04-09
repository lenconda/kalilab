FROM node:10

RUN echo "deb http://http.kali.org/kali kali-rolling main contrib non-free" > /etc/apt/sources.list && \
    echo "deb-src http://http.kali.org/kali kali-rolling main contrib non-free" >> /etc/apt/sources.list
RUN apt install -y gnupg && \
  apt-key adv --recv-keys --keyserver keyserver.ubuntu.com ED444FF07D8D0BF6 && \
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

ENV OPENSSL_CONF=/etc/ssl

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
