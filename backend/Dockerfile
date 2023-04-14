FROM node:latest

WORKDIR /app/backend

COPY package*.json ./
COPY prisma ./prisma/
COPY client ./client/


RUN npm install
RUN npx prisma generate



COPY . .

RUN npm run build

EXPOSE 3000
CMD ["./startup.sh"]
