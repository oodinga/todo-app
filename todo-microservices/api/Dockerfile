FROM golang:alpine as builder
WORKDIR /app
COPY go.mod go.sum ./
#Install go dependencis
RUN go mod download

COPY . .

RUN go build -o /app/todo-api .
# COPY .env .

CMD ["/app/todo-api"]