FROM node:20.11.0-alpine AS build

WORKDIR /app   
COPY . /app
ARG BASE_SUPERAPP_WEB_PATH
ENV BASE_WEB_PATH=${BASE_SUPERAPP_WEB_PATH}
RUN npm install --production
RUN npm run build
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]