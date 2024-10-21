FROM golang:1.22

WORKDIR /gommerce/src/api/auth

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./out/auth .

EXPOSE 1100

CMD ["./out/auth"]