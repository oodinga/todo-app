FROM golang:alpine as builder
WORKDIR /app
COPY go.mod go.sum ./
#Install go dependencis
RUN go mod download

COPY . .

RUN go build -o /app/todo-api .

# The run stage
FROM scratch
WORKDIR /app
COPY --from=builder /app/todo-api /app/todo-api
COPY --from=builder /app/.env .
# RUN ls -a
EXPOSE 8080
CMD ["/app/todo-api"]