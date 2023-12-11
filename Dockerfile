
FROM node:21.4.0-alpine

WORKDIR /sneaker-app

COPY package.json ./

RUN rm -rf node_modules && npm install && npm cache clean --force

COPY . .

CMD ["node", "./server.js"]
