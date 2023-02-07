FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .