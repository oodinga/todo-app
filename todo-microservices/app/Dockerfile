FROM golang:alpine as builder
WORKDIR /app
COPY go.mod go.sum ./
#Install go dependencis
RUN go mod download

COPY . .

RUN go build -o /app/todo-app .
# COPY /app/.env .
CMD ["/app/todo-app"]