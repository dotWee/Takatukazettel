FROM node:latest
RUN mkdir -p /usr/src/app
ENV MONGO_URL mongodb://mongo/takatukazettel
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm install
EXPOSE 10010
CMD [ "npm", "start" ]