FROM node:argon

RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN npm install

EXPOSE 5000
CMD ["npm", "start"]