FROM node:20.11.0-alpine AS build

WORKDIR /app   
COPY . /app
ARG BASE_DOMAIN_WITH_PROTOCOL
ENV BASE_DOMAIN_WITH_PROTOCOL=${BASE_DOMAIN_WITH_PROTOCOL}
ARG BASE_DORM_WEB_PATH
ENV BASE_WEB_PATH=${BASE_DORM_WEB_PATH}
ARG BASE_DORM_SERVER_PATH
ENV BASE_SERVER_PATH=${BASE_DORM_SERVER_PATH}

RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:stable-alpine AS serve

COPY --from=build /app/build /usr/share/nginx/html
COPY default.template /etc/nginx/templates/default.conf.template
