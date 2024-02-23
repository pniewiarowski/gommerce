FROM golang:1.22

WORKDIR /gommerce/api/go/authentication

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./out/authentication-service .

EXPOSE 8080

CMD ["./out/authentication-service"]
