# ============== 1. СБОРКА ФРОНТА ==============
FROM node:18-alpine AS build
WORKDIR /app

# Копируем манифесты и конфиги
COPY package*.json ./
COPY tsconfig*.json vite.config.ts ./

# Копируем исходники
COPY src ./src
COPY public ./public

# Установка зависимостей и сборка
RUN npm install
RUN npm run build

# ============== 2. RUNTIME-СЕРВЕР ==============
FROM node:18-alpine AS final
WORKDIR /app

ENV NODE_ENV=production

# Ставим только прод-зависимости (Express и т.д.)
COPY package*.json ./
RUN npm install --omit=dev

# Кладём собранный фронт и сервер
COPY --from=build /app/build ./build
COPY server.js ./server.js

# Cloud Run будет ходить на 8080
EXPOSE 8080

CMD ["node", "server.js"]
