let tasks = [];
let filter = 'all';

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const allTasksButton = document.getElementById('allTasks');
const completedTasksButton = document.getElementById('completedTasks');
const pendingTasksButton = document.getElementById('pendingTasks');


addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
   
    if (taskName) {
        const existingTask = tasks.find(t => t.name === taskName);
        if (existingTask) {
            alert('Task already exists!');
            return;
        }
        const task = {
            id: Date.now(),
            name: taskName,
            isCompleted: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
});


function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.isCompleted;
        if (filter === 'pending') return !task.isCompleted;
        return true;
    });
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.className = task.isCompleted ? 'completed' : '';
        li.addEventListener('click', () => toggleTaskCompletion(task.id));
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            removeTask(task.id);
        });
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.isCompleted = !task.isCompleted;
        renderTasks();

    }
}


function removeTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    alert('Task is removed.')
}


allTasksButton.addEventListener('click', () => {
    filter = 'all';
    renderTasks();
});

completedTasksButton.addEventListener('click', () => {
    filter = 'completed';
    renderTasks();
});

pendingTasksButton.addEventListener('click', () => {
    filter = 'pending';
    renderTasks();
});
