FROM node:14.16.0

RUN rm -rf /var/lib/apt/lists/* && apt-get update -y
RUN apt-get install -y yarn

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000