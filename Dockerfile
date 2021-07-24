FROM node:14

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY src src

CMD ["yarn", "start"]