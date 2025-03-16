document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

      const taskInput = document.getElementById("new-task-description");
      const taskText = taskInput.value.trim();

      if (taskText === "") return;

      const taskItem = document.createElement("li");
      taskItem.innerHTML = `${taskText} <button class="delete-btn">X</button>`;

      taskItem.querySelector(".delete-btn").addEventListener("click", () => {
          taskItem.remove();
      });

      taskList.appendChild(taskItem);
      taskInput.value = ""; 
    });
  });