FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR ./Shop
COPY . ./
RUN dotnet build
CMD ['dotnet', '.\bin\Debug\net8.0\Shop.dll']
