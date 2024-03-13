FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR ./Shop
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /Shop
COPY --from=build-env /Shop/out .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]
