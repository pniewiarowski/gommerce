FROM golang:1.22 AS build
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . ./
RUN go build -o main .

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=build /app/main .
EXPOSE 8080
CMD ["./main"]
