# Dockerfile
FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install

RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD [ "yarn", "dev" ]
