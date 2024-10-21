FROM golang:1.22

WORKDIR /gommerce/src/api/shop

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./out/shop .

EXPOSE 1110

CMD ["./out/shop"]
