FROM node:8.6 AS build

WORKDIR /usr/src/app

COPY  package*.json .

RUN npm install

COPY . .

EXPOSE 4200

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html