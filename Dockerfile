FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
