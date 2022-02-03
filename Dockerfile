FROM node:12-slim

WORKDIR /usr/src/client-app

RUN apt-get update
RUN echo y | apt-get install git
RUN npm install -g @angular/cli
RUN npm install --save firebase

COPY ./ ./

RUN echo N | npm i

EXPOSE 4200