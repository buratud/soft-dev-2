FROM node:20.11.0-alpine AS build

WORKDIR /app   
COPY . /app
ARG BASE_EATS_WEB_PATH
ENV BASE_WEB_PATH=${BASE_EATS_WEB_PATH}
RUN npm install --omid=dev
RUN npm run build
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]