FROM node:18-alpine


WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .


EXPOSE 3000

RUN rm prisma/dev.sqlite
RUN npx prisma migrate dev --name init

CMD [ "npm", "run", "dev" ]