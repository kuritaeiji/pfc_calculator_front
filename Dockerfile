FROM node:14

WORKDIR /app

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

COPY . /app

RUN yarn install

RUN yarn build
