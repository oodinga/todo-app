package main

import (
	"app/server"
	"github.com/joho/godotenv"
	"log"
)

func init() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using default values")
	}
}
func main() {
	server.StartServer()
}
