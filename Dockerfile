FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3000

# ⚠️ DO NOT start server here
CMD ["sh", "-c", "sleep 30 && npx prisma migrate deploy && npm run start"]
