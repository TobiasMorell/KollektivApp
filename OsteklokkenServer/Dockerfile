# docker build -t KollektivApp/OsteklokkenServer .
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
ENV PROJECT_NAME=OsteklokkenServer
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY ${PROJECT_NAME}/*.csproj ./${PROJECT_NAME}/
# copy everything else and build app
COPY ./* ./${PROJECT_NAME}/
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-alpine AS runtime
ENV PROJECT_NAME=OsteklokkenServer
WORKDIR /app
COPY --from=build /app/${PROJECT_NAME}/out ./
EXPOSE 5000
ENTRYPOINT ["dotnet", "OsteklokkenServer.dll", "--host", "0.0.0.0"]
