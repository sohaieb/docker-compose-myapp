FROM node:20.2.0-alpine3.17

ARG FRONT_EXPOSED_PORT=4200
EXPOSE $FRONT_EXPOSED_PORT


WORKDIR /frontend

COPY package.json package-lock.json .

RUN npm install -g @angular/cli && npm i

COPY . .

CMD ng serve --project=my-app --host 0.0.0.0 --poll 1
