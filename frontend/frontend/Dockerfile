FROM node:lts-buster AS base
WORKDIR /frontend
COPY package.json .
COPY yarn.lock .
RUN ["yarn", "install", "--frozen-lockfile"]
COPY . .

FROM base as dev
CMD ["yarn", "run", "dev"]

FROM dev as build
RUN ["yarn", "run", "build"]

FROM build as prod
# RUNNING WITHOUT PM2:
# https://stackoverflow.com/a/55245460
EXPOSE 3000
CMD ["yarn", "run", "start"]
