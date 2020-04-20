FROM node:12-buster

WORKDIR /frontend-crawler
COPY . /frontend-crawler

RUN yarn install
