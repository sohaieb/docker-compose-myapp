FROM node:20.2.0-alpine3.17

ARG BACK_EXPOSED_PORT=3001
EXPOSE $BACK_EXPOSED_PORT


ENV BACK_PORT $BACK_EXPOSED_PORT
ENV DB_HOST mywebapp-DB
ENV DB_USER sohaieb
ENV DB_PASS 123456
ENV DB_DATABASE mywebbapp

RUN npm install -g nodemon

WORKDIR /backend

COPY package.json package-lock.json .

RUN npm i

COPY . .

CMD nodemon --legacy-watch main.js