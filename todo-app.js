// ==========================================================================
// Assignment 5.1: Interactive Persistent To-Do List Controller Engine
// ==========================================================================

// 1. Core DOM Element Selection Hooks
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// 2. Initialize task memory dataset array from localStorage cache or default to empty
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. Render function to cleanly draw the current dataset elements onto the screen canvas
function renderTasks() {
    // Wipe out current visible list items to prevent duplication overlaps
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `todo-item-node ${task.completed ? 'completed-task-state' : ''}`;

        // Create Task Label Text element
        const textSpan = document.createElement("span");
        textSpan.innerText = task.text;
        textSpan.className = "task-text-label";
        // Click text to toggle completion assignment state
        textSpan.addEventListener("click", () => toggleTaskCompletion(index));

        // Create individual Delete Button component
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&times;"; // Visual cross symbol icon
        deleteBtn.className = "delete-task-btn";
        deleteBtn.setAttribute("aria-label", "Delete Task Button");
        deleteBtn.addEventListener("click", () => deleteTask(index));

        // Assemble pieces into list element box
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    // Sync current list state data downward into browser localStorage cache memory
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Action Function: Add a fresh task element node row
todoForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Halt form native page reload behavior trigger
    
    const taskText = todoInput.value.trim();
    
    // Client-side input layout empty validation verification pass check
    if (taskText === "") return;

    // Push new data structure configuration object into core tracking array
    tasks.push({
        text: taskText,
        completed: false
    });

    // Clear user entry input line box field and refresh screen view panel
    todoInput.value = "";
    renderTasks();
});

// 5. Action Function: Toggle completion Boolean state trace check flag
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// 6. Action Function: Slice out single element index block from row layout
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// 7. Kickstart App Execution on initial page window boot mount cycle
renderTasks();
