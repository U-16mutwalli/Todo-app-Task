let tasks = []; // Holds the task data
let currentFilter = 'all'; // Filter state: 'all', 'pending', or 'completed'
let currentTheme = localStorage.getItem('theme') || 'light'; // Get saved theme preference

// Get DOM elements
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskDueDate = document.getElementById('task-dueDate');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const toast = document.getElementById('toast');
const themeToggleBtn = document.getElementById('theme-toggle');

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show Toast Notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Render tasks
function renderTasks() {
  loadTasks(); // Load tasks from localStorage before rendering

  // Clear existing lists
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, index) => {
    if (currentFilter !== 'all' && currentFilter !== task.status) return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.draggable = true;
    li.dataset.index = index;

    li.innerHTML = `
      <div class="task-content">
        <strong>${task.title}</strong><br/>
        ${task.description ? task.description + '<br/>' : ''}
        ${task.dueDate ? `🗓️ ${task.dueDate}` : ''}
      </div>
      <div class="task-actions">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
        <button onclick="toggleComplete(${index})">✅</button>
      </div>
    `;

    // Drag and Drop functionality
    li.addEventListener('dragstart', () => li.classList.add('dragging'));
    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
      saveTasks();
    });

    li.addEventListener('dragover', (e) => e.preventDefault());

    li.addEventListener('drop', (e) => {
      const dragged = document.querySelector('.dragging');
      const fromIndex = +dragged.dataset.index;
      const toIndex = +li.dataset.index;

      if (fromIndex !== toIndex) {
        const temp = tasks[fromIndex];
        tasks[fromIndex] = tasks[toIndex];
        tasks[toIndex] = temp;

        showToast('🔃 Tasks Reordered');
        saveTasks();
        renderTasks();
      }
    });

    if (task.status === 'pending') {
      pendingList.appendChild(li);
    } else {
      completedList.appendChild(li);
    }
  });
}

// Add task
function addTask() {
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const dueDate = taskDueDate.value;

  if (!title) {
    alert('Title is required');
    return;
  }

  const newTask = {
    title,
    description,
    dueDate,
    status: 'pending'
  };

  tasks.push(newTask);
  showToast('✅ Task Created');
  saveTasks();
  renderTasks();

  // Clear input fields
  taskTitle.value = '';
  taskDescription.value = '';
  taskDueDate.value = '';
}

// Edit task
function editTask(index) {
  const task = tasks[index];
  taskTitle.value = task.title;
  taskDescription.value = task.description;
  taskDueDate.value = task.dueDate;

  // Remove the task and allow the user to edit it
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showToast('✏️ Task Updated');
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showToast('🗑️ Task Deleted');
}

// Toggle task completion status
function toggleComplete(index) {
  const task = tasks[index];
  task.status = task.status === 'pending' ? 'completed' : 'pending';
  saveTasks();
  renderTasks();
  showToast(task.status === 'completed' ? '🔄 Task Moved to Completed' : '🔄 Task Moved to Incomplete');
}

// Set filter
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// Toggle theme
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  document.body.className = currentTheme;
  renderTasks();
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
themeToggleBtn.addEventListener('click', toggleTheme);

// Load and render tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  document.body.className = currentTheme; // Set the initial theme
  renderTasks();
});
