document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Cargar tareas guardadas al iniciar
    loadTasks();

    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', function (event) {
        const target = event.target;
        const li = target.closest('li');

        if (target.classList.contains('delete-btn')) {
            if (confirm("¿Deseas eliminar esta tarea?")) {
                li.remove();
                saveTasks();
            }
        } else if (target.classList.contains('edit-btn')) {
            const span = li.querySelector('.task-text');
            const newText = prompt("Editar tarea:", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText.trim();
                saveTasks();
            }
        } else if (target.classList.contains('task-text')) {
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    function addTask(taskText, completed = false) {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');

        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
});
