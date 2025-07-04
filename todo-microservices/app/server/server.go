package server

import (
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// StartServer initializes and starts the API server
func StartServer() {

	// Set up Gin router
	router := gin.Default()

	// Serve static files from the app directory
	router.Static("/static", "./files")

	// Serve the frontend app
	router.GET("/", func(c *gin.Context) {
		c.File(filepath.Join("files", "index.html"))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	// Start server
	log.Println("Server starting on http://localhost:" + port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
