const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const dateTime = new Date().toLocaleString();
    addTaskToDOM(taskText, dateTime);
    saveTaskToLocalStorage(taskText, dateTime);
    taskInput.value = "";
}

function addTaskToDOM(taskText, dateTime, isCompleted = false) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${taskList.children.length + 1}</td>
        <td class="${isCompleted ? 'completed' : ''}">${taskText}</td>
        <td>${dateTime}</td>
        <td>
            <button class="action-btn status-btn">${isCompleted ? 'Completed' : 'Mark Complete'}</button>
        </td>
        <td>
            <button class="action-btn edit-btn">Edit</button>
            <button class="action-btn delete-btn">Delete</button>
        </td>
    `;

    const statusBtn = row.querySelector(".status-btn");
    const deleteBtn = row.querySelector(".delete-btn");
    const editBtn = row.querySelector(".edit-btn");

    statusBtn.addEventListener("click", () => {
        row.querySelector("td:nth-child(2)").classList.toggle("completed");
        statusBtn.textContent = row.querySelector("td:nth-child(2)").classList.contains("completed")
            ? "Completed"
            : "Mark Complete";
    });

    deleteBtn.addEventListener("click", () => {
        row.remove();
    });

    editBtn.addEventListener("click", () => {
        const taskCell = row.querySelector("td:nth-child(2)");
        const newText = prompt("Edit your task:", taskCell.textContent);
        if (newText) {
            taskCell.textContent = newText;
        }
    });

    taskList.appendChild(row);
}

function saveTaskToLocalStorage(taskText, dateTime) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, dateTime: dateTime });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToDOM(task.text, task.dateTime));
}
