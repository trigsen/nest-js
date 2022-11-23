FROM node:14 As development

WORKDIR /usr/src/app

COPY package.json yarn ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["ls"]
#CMD ["node", "dist/main.js"]
