FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
RUN npm i

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json

CMD npm start
