# Лёгкий Node-образ
FROM node:20-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Сначала копируем только package*.json — чтобы кешировать зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект внутрь контейнера
COPY . .

# Собираем Vite-проект в папку build
RUN npm run build

# Настройки окружения
ENV NODE_ENV=production
ENV PORT=3000

# Открываем порт
EXPOSE 3000

# Запускаем наш express-сервер
CMD ["node", "server.js"]
