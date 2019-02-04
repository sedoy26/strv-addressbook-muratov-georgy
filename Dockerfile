FROM node:alpine

RUN mkdir /src
WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run" ]