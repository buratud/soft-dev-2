FROM node:20.11.0-alpine AS build

WORKDIR /app
COPY . /app
RUN npm install --omit=dev
EXPOSE 4002

ENTRYPOINT [ "npm", "start" ]