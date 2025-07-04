# Todo List Application

A full-stack todo list application with a Go backend API and an HTMX-powered frontend.

## Features

- Create, read, update, and delete todo items
- Persistent storage using MySQL database
- RESTful API design
- Interactive frontend using HTMX and JavaScript

## Prerequisites

- Go 1.24 or higher
- MySQL server installed and running

## Getting Started

1. Clone the repository
2. Create a MySQL database named `todos`
   ```sql
   CREATE DATABASE todos;
   ```
3. Configure the database connection by creating a `.env` file in the project root with the following variables (or use the provided default values):
   ```
   DB_USER=root
   DB_PASSWORD=password
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=todos
   ```
4. Run the application:
   ```
   go run main.go
   ```
5. The server will start on http://localhost:8080
6. Open your browser and navigate to http://localhost:8080 to use the application

## Frontend Application

The frontend application is built using:
- HTML5
- Bootstrap 5 for styling
- HTMX for enhanced interactivity
- JavaScript for API communication

### Features
- View a list of all todos
- Add new todos
- Mark todos as complete/incomplete
- Delete todos

## API Endpoints

### GET /api/v1/todos
Returns a list of all todos.

### GET /api/v1/todos/:id
Returns a specific todo by ID.

### POST /api/v1/todos
Creates a new todo.

Request body:
```json
{
  "title": "Task title",
  "description": "Task description",
  "completed": false
}
```

### PUT /api/v1/todos/:id
Updates an existing todo.

Request body:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### DELETE /api/v1/todos/:id
Deletes a todo.

## Testing the API

You can test the API using curl or any API testing tool like Postman.

### Example curl commands:

#### List all todos:
```
curl -X GET http://localhost:8080/api/v1/todos
```

#### Get a specific todo:
```
curl -X GET http://localhost:8080/api/v1/todos/1
```

#### Create a new todo:
```
curl -X POST http://localhost:8080/api/v1/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread","completed":false}'
```

#### Update a todo:
```
curl -X PUT http://localhost:8080/api/v1/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread, cheese","completed":true}'
```

#### Delete a todo:
```
curl -X DELETE http://localhost:8080/api/v1/todos/1
```

## Environment Variables

The application uses environment variables for configuration. These can be set in a `.env` file in the project root directory:

- `DB_USER`: Database username (default: "root")
- `DB_PASSWORD`: Database password (default: "password")
- `DB_HOST`: Database host (default: "127.0.0.1")
- `DB_PORT`: Database port (default: "3306")
- `DB_NAME`: Database name (default: "todos")

## Project Structure

- `main.go`: Entry point of the application
- `.env`: Environment configuration file
- `api/`: API-related code
  - `server.go`: API server initialization
  - `models/todo.go`: Todo model definition
  - `database/db.go`: Database connection and initialization
  - `handlers/todo.go`: API handlers for todo operations
- `app/`: Frontend application
  - `index.html`: Main frontend application
