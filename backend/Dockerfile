FROM node:18
WORKDIR /srv/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "run", "prod"]
