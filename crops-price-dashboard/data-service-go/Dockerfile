# Stage 1: Build

FROM golang:1.19-alpine AS builder
WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN go build -o data-service

# Stage 2: Runtime

FROM alpine:latest
WORKDIR /app

COPY --from=builder /app/data-service .

EXPOSE 8081
CMD ["./data-service"]

