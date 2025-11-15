# =======================
# 1. СБОРКА ФРОНТА (Vite)
# =======================
FROM node:18-alpine AS frontend-build
WORKDIR /app

# копируем frontend-зависимости
COPY package*.json ./
COPY vite.config.* tsconfig*.json ./

# папки с кодом
COPY src ./src
COPY public ./public

RUN npm install
RUN npm run build

# ==================================
# 2. СБОРКА BACKEND'А (ASP.NET Core)
# ==================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

# Копируем .csproj
COPY backend/*.csproj ./backend/
RUN dotnet restore ./backend/*.csproj

# Копируем остальной C# код
COPY backend/. ./backend/

# Кладём собранный фронт в wwwroot
COPY --from=frontend-build /app/dist ./backend/wwwroot

WORKDIR /src/backend
RUN dotnet publish -c Release -o /app/publish

# ======================
# 3. RUNTIME-КОНТЕЙНЕР
# ======================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=backend-build /app/publish .

# В Cloud Run принято слушать 8080
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# ЗДЕСЬ ВАЖНО: замени TestApi.dll на ИМЯ твоего dll (проекта)
ENTRYPOINT ["dotnet", "TestApi.dll"]
