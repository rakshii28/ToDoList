document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-button');

    let tasks = [];

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            taskInput.value = '';
            renderTasks();
        }
    });

    // Render tasks
    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-task">&#10003;</button>
                    <button class="edit-task">&#9998;</button>
                    <button class="delete-task">&#10005;</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Handle task list actions
    taskList.addEventListener('click', (e) => {
        const id = e.target.closest('.task-item').dataset.id;
        if (e.target.classList.contains('complete-task')) {
            toggleTaskCompletion(id);
        } else if (e.target.classList.contains('edit-task')) {
            editTask(id);
        } else if (e.target.classList.contains('delete-task')) {
            deleteTask(id);
        }
    });

    // Toggle task completion
    const toggleTaskCompletion = (id) => {
        tasks = tasks.map(task => {
            if (task.id == id) task.completed = !task.completed;
            return task;
        });
        renderTasks();
    };

    // Edit task
    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id == id);
        const newText = prompt('Edit task:', taskToEdit.text);
        if (newText) {
            tasks = tasks.map(task => {
                if (task.id == id) task.text = newText.trim();
                return task;
            });
            renderTasks();
        }
    };

    // Delete task
    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id != id);
        renderTasks();
    };

    // Filter tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-button.active').classList.remove('active');
            button.classList.add('active');
            renderTasks(button.dataset.filter);
        });
    });

    renderTasks();
});
