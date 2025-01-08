// script.js

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from local storage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };
  
    // Save tasks to local storage
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll("li").forEach(taskItem => {
        tasks.push({
          text: taskItem.querySelector(".task-text").textContent,
          completed: taskItem.classList.contains("completed"),
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Add task to DOM
    const addTaskToDOM = (taskText, completed = false) => {
      const li = document.createElement("li");
      li.className = completed ? "completed" : "";
  
      const span = document.createElement("span");
      span.textContent = taskText;
      span.className = "task-text";
      span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    };
  
    // Add task event
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = "";
      }
    });
  
    // Load tasks on page load
    loadTasks();
  });
  