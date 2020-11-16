FROM node:lts-buster AS build
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

# CMD ["yarn", "start"]

RUN npm run build
CMD ["npm", "run", "dev"]
