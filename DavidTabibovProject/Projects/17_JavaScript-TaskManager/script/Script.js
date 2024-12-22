const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const downloadBtn = document.createElement('button');
downloadBtn.textContent = 'Download JSON';
downloadBtn.classList.add('btn', 'btn-secondary', 'my-3');
document.querySelector('.card-body').appendChild(downloadBtn);

let tasks = [];

// Add new task
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDetails = document.getElementById('taskDetails').value;
    const taskPriority = document.getElementById('taskPriority').value;

    const task = {
        id: new Date().getTime(),
        name: taskName,
        details: taskDetails,
        priority: taskPriority
    };

    tasks.push(task);
    updateTaskList();

    taskForm.reset();
});

// Update task list in the DOM
function updateTaskList() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        taskItem.innerHTML = `
            <div>
                <h6>${task.name}</h6>
                <p>${task.details || 'No details provided.'}</p>
                <span class="badge bg-${getPriorityColor(task.priority)}">${task.priority}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Get color based on priority
function getPriorityColor(priority) {
    switch (priority) {
        case 'High':
            return 'danger';
        case 'Medium':
            return 'warning';
        case 'Low':
            return 'success';
        default:
            return 'secondary';
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
}

// Download tasks as JSON
downloadBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasks.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Load tasks from JSON file
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json';
fileInput.classList.add('form-control', 'my-3');
document.querySelector('.card-body').appendChild(fileInput);

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                tasks = JSON.parse(e.target.result);
                updateTaskList();
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
});
