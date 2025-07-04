package api

import (
	"log"
	"path/filepath"
	"todo/api/database"
	"todo/api/handlers"

	"github.com/gin-gonic/gin"
)

// StartServer initializes and starts the API server
func StartServer() {
	// Initialize database
	database.InitDB()

	// Set up Gin router
	router := gin.Default()

	// Serve static files from the app directory
	router.Static("/static", "./app")

	// Serve the frontend app
	router.GET("/", func(c *gin.Context) {
		c.File(filepath.Join("app", "index.html"))
	})

	// API routes
	v1 := router.Group("/api/v1")
	{
		todos := v1.Group("/todos")
		{
			todos.GET("", handlers.GetTodos)
			todos.GET("/:id", handlers.GetTodo)
			todos.POST("", handlers.CreateTodo)
			todos.PUT("/:id", handlers.UpdateTodo)
			todos.DELETE("/:id", handlers.DeleteTodo)
		}
	}

	// Start server
	log.Println("Server starting on http://localhost:8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
