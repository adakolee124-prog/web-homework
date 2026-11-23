import './style.css';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('vite-tasks')) || [];

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item-node ${task.completed ? 'completed-task-state' : ''}`;

    const textSpan = document.createElement('span');
    textSpan.innerText = task.text;
    textSpan.className = 'task-text-label';
    textSpan.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.className = 'delete-task-btn';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  localStorage.setItem('vite-tasks', JSON.stringify(tasks));
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  todoInput.value = '';
  renderTasks();
});

renderTasks();
