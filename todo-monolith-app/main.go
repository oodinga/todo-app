package main

import (
	"github.com/joho/godotenv"
	"log"
	"todo/api"
)

func init() {
	log.SetFlags(log.Ldate | log.Lmicroseconds | log.Lshortfile)

	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using default values")
	}
}

func main() {
	api.StartServer()
}
