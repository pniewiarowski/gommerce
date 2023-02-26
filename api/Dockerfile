FROM golang:1.20

WORKDIR /gommerce/api

COPY go.mod .
COPY go.sum ..

RUN go mod download

COPY . .

RUN go build -o ./out/api .

EXPOSE 3000

CMD ["./out/api"]
