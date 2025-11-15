# Этап 1 — сборка
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем csproj отдельно (ускоряет сборку)
COPY TestApi.csproj .
RUN dotnet restore

# Копируем остальной проект
COPY . .

# Публикуем релизную сборку
RUN dotnet publish -c Release -o /app

# Этап 2 — рантайм (лёгкий образ)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Копируем результат сборки
COPY --from=build /app .

# Render требует запуск через порт 8080
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "TestApi.dll"]
