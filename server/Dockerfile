ARG NODE_VERSION=10.16

FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /opt/build
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline

FROM node:${NODE_VERSION}-alpine
WORKDIR /opt/app
COPY --from=builder /opt/build .
EXPOSE 3000
CMD ["node", "dist/server.js"]
