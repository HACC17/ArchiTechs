FROM web:latest
WORKDIR /web

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
