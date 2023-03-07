FROM node:latest

WORKDIR /app/backend

COPY package*.json ./
COPY prisma ./prisma/

RUN npx primsa db push
RUN npx primsa generate
RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod"]