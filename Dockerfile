FROM node:latest
RUN mkdir -p /usr/src/app
ENV MONGO_URL mongodb://mongo/takatukazettel
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.0.0/wait /wait
RUN chmod +x /wait

EXPOSE 10010
CMD /wait && npm start