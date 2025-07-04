// Global variables for todo management
let todos = [];
let baseurl = "http://localhost:8081/api/v1/todos"

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to update stats
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;

    document.getElementById('total-count').textContent = total;
    document.getElementById('pending-count').textContent = pending;
    document.getElementById('completed-count').textContent = completed;
}

// Function to render a todo item
function renderTodoItem(todo) {
    return `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" id="todo-${todo.id}">
            <div class="d-flex justify-content-between align-items-start">
                <div class="flex-grow-1">
                    <div class="todo-title">${todo.title}</div>
                    <div class="todo-description">${todo.description || ''}</div>
                    <div class="todo-meta">
                        <i class="fas fa-clock"></i>
                        <span>Created ${formatDate(todo.created_at)}</span>
                    </div>
                </div>
                <div class="btn-group ms-3" role="group">
                    <button class="btn btn-icon ${todo.completed ? 'btn-warning' : 'btn-success-outline'}" onclick="toggleTodoStatus(${todo.id}, '${todo.title}', '${todo.description || ''}', ${!todo.completed})">
                        <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                        ${todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="btn btn-icon btn-danger-outline" onclick="deleteTodo(${todo.id})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to render all todos
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');

    if (todos.length === 0) {
        todoList.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        todoList.innerHTML = todos.map(todo => renderTodoItem(todo)).join('');
    }

    // updateStats();
}

// Function to load todos from API
function loadTodos() {
    fetch(baseurl)
        .then(response => response.json())
        .then(data => {
            todos = data;
            renderTodos();
        })
        .catch(error => {
            console.error('Error loading todos:', error);
            showNotification('Failed to load tasks', 'error');
        });
}

// Function to create a new todo via API
function createTodo(title, description) {
    fetch(baseurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: false
        }),
    })
        .then(response => response.json())
        .then(todo => {
            todos.push(todo);
            renderTodos();
            document.getElementById('todo-form').reset();
            showNotification('Task created successfully!', 'success');
        })
        .catch(error => {
            console.error('Error creating todo:', error);
            showNotification('Failed to create task', 'error');
        });
}

// Function to toggle todo status via API
function toggleTodoStatus(id, title, description, completed) {
    fetch(`${baseurl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: completed
        }),
    })
        .then(response => response.json())
        .then(updatedTodo => {
            const todoIndex = todos.findIndex(t => t.id === id);
            if (todoIndex !== -1) {
                todos[todoIndex] = updatedTodo;
                renderTodos();
                showNotification(updatedTodo.completed ? 'Task completed!' : 'Task marked as pending', 'info');
            }
        })
        .catch(error => {
            console.error('Error updating todo:', error);
            showNotification('Failed to update task', 'error');
        });
}

// Function to delete a todo via API
function deleteTodo(id) {
    fetch(`${baseurl}/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            todos = todos.filter(t => t.id !== id);
            renderTodos();
            showNotification('Task deleted', 'warning');
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
            showNotification('Failed to delete task', 'error');
        });
}

// Function to show notifications
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-gradient)' :
            type === 'warning' ? 'var(--danger-gradient)' :
                type === 'error' ? 'var(--danger-gradient)' :
                    'var(--primary-gradient)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow-primary);
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event listener for form submission
document.getElementById('todo-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    if (title) {
        createTodo(title, description);
    }
});

// Initialize app by loading todos from API
document.addEventListener('DOMContentLoaded', function () {
    loadTodos();
});