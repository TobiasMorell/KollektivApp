FROM node:alpine as build

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i

COPY ./preact.config.js .
COPY ./src ./src
RUN npm run build

FROM nginx:1.19-alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/build ./
COPY nginx/preact-nginx.conf /etc/nginx/conf.d/default.conf