const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage, or start with an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// --- CORE FUNCTIONS ---

/**
 * Saves the current tasks array to Local Storage.
 */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Renders the tasks array to the DOM.
 */
function renderTasks() {
    taskList.innerHTML = ""; // Clear existing list
    
    tasks.forEach((task) => {
        // 1. Create the List Item (li)
        const listItem = document.createElement("li");
        listItem.classList.toggle("completed", task.completed); // Add 'completed' class if needed
        
        // 2. Create the Task Text Span
        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.text;
        
        // 3. Create the Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "🗑️";
        
        // 4. Attach Event Listeners to the elements
        
        // Toggle completion status on text click
        taskText.addEventListener("click", () => {
            toggleTaskCompletion(task.id);
        });

        // Delete task on button click
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        // 5. Assemble the listItem
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);
        
        // 6. Add to the main list
        taskList.appendChild(listItem);
    });
}

// --- CRUD ACTIONS ---

/**
 * Adds a new task.
 */
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === "") {
        alert("Please enter a task description!");
        return;
    }

    const newTask = {
        id: Date.now(), // Use timestamp for a unique ID
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = ""; // Clear the input field
}

/**
 * Toggles the 'completed' status of a task.
 */
function toggleTaskCompletion(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }
}

/**
 * Deletes a task by ID.
 */
function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}


// --- EVENT LISTENERS ---

// 1. Add task button click
addTaskBtn.addEventListener("click", addTask);

// 2. Add task on 'Enter' key press
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// --- INITIALIZATION ---
renderTasks(); // Load and display tasks when the page loads