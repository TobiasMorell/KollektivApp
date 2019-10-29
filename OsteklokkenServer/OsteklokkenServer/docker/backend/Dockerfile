FROM alpine AS gitCloner
RUN apk --update --no-cache --quiet add git openssh
WORKDIR /project
RUN git clone https://github.com/TobiasMorell/KollektivApp.git

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-alpine AS backendBuilder
WORKDIR /app
COPY --from=gitCloner /project/KollektivApp/OsteklokkenServer/ ./
RUN dotnet publish OsteklokkenServer/OsteklokkenServer.csproj -c Release -o build


FROM node:12.10.0-alpine AS frontendBuilder
RUN apk --update --no-cache --quiet add git openssh
WORKDIR /app
COPY --from=gitCloner /project/KollektivApp/ ./
RUN npm install --no-progress --silent
RUN npm run build


FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-alpine AS runtime
WORKDIR /app
COPY --from=backendBuilder /app/build ./
COPY --from=frontendBuilder /app/build ./public/
EXPOSE 5000
ENTRYPOINT ["dotnet", "OsteklokkenServer.dll"]