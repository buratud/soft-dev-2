FROM node:20.11.0-alpine AS build

WORKDIR /app

ARG BASE_DOMAIN_WITH_PROTOCOL
ENV REACT_APP_BASE_DOMAIN_WITH_PROTOCOL=${BASE_DOMAIN_WITH_PROTOCOL}
ARG MAIN_URL
ENV REACT_APP_MAIN_URL=${MAIN_URL}
ARG BASE_DORM_WEB_PATH
ENV REACT_APP_BASE_WEB_PATH=${BASE_DORM_WEB_PATH}
ARG BASE_DORM_SERVER_PATH
ENV REACT_APP_BASE_SERVER_PATH=${BASE_DORM_SERVER_PATH}

# Separating the copy of package.json can save time on rebuilding the image if the package.json file is not changed
COPY package.json .
RUN npm install --omit=dev --legacy-peer-deps
COPY . .
RUN sed -i "s|http://localhost:3003|${BASE_DOMAIN_WITH_PROTOCOL}${BASE_DORM_WEB_PATH}|g" package.json
RUN npm run build

FROM nginx:stable-alpine AS serve

COPY --from=build /app/build /usr/share/nginx/html
COPY default.template /etc/nginx/templates/default.conf.template
