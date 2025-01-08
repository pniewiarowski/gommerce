FROM golang:1.22

WORKDIR /gommerce/src/api/cms

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./out/cms .

EXPOSE 1120

CMD ["./out/cms"]