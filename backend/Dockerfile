FROM node:16.17.0-alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY .. .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
