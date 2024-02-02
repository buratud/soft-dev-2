FROM node:20.11.0-alpine AS build

WORKDIR /app
COPY . /app
RUN npm install --omit=dev
RUN npm run build
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]