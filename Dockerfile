FROM node

WORKDIR /usr/app

COPY package.json ./

COPY . .

RUN npm install --force


EXPOSE 3333

CMD ["npm", "run", "dev"]

