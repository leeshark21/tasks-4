document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = '';
        
        if (tasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `todo-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <span style="flex: 1; cursor: pointer;" class="task-text">${escapeHTML(task.text)}</span>
                    <div class="todo-actions">
                        <button class="toggle" aria-label="Toggle Complete">${task.completed ? '↩️' : '✓'}</button>
                        <button class="delete" aria-label="Delete">🗑️</button>
                    </div>
                `;

                // Add event listeners for this item
                const toggleBtn = li.querySelector('.toggle');
                const deleteBtn = li.querySelector('.delete');
                const textSpan = li.querySelector('.task-text');
                
                textSpan.addEventListener('click', () => toggleTask(index));
                toggleBtn.addEventListener('click', () => toggleTask(index));
                deleteBtn.addEventListener('click', () => deleteTask(index));

                todoList.appendChild(li);
            });
        }
    }

    function addTask(text) {
        tasks.push({
            text: text,
            completed: false,
            id: Date.now()
        });
        saveTasks();
        renderTasks();
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Handle form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTask(text);
            todoInput.value = '';
        }
    });

    // Helper to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Initial render
    renderTasks();
});
