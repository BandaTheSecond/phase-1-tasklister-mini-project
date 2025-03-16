document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const sortButton = document.getElementById("sort");
  const livePreview = document.getElementById("live-preview");
  let tasks = [];
  let sortAscending = true; 

  taskInput.addEventListener("input", () => {
    livePreview.textContent = taskInput.value ? `Task: ${taskInput.value}` : "";});

  form.addEventListener("submit", (event) => {
      event.preventDefault();

      const taskText = document.getElementById("task").value.trim();
      const userText = document.getElementById("user").value.trim();
      const dueDate = document.getElementById("due-date").value;
      const priority = document.getElementById("priority").value;

      if (taskText === "" || userText === "" || dueDate === "") return;

      const newTask = { taskText, userText, dueDate, priority };
      tasks.push(newTask);
      renderTasks();
      form.reset();
      livePreview.textContent = ""; 
  });

  function renderTasks() {
      taskList.innerHTML = "";

      tasks.forEach((task, index) => {
          const taskItem = document.createElement("li");
          taskItem.className = task.priority;
          taskItem.innerHTML = `
              ${task.taskText} - <strong>${task.userText}</strong> (Due: ${task.dueDate})
              <button class="edit-btn" data-index="${index}">✏️ Edit</button>
              <button class="delete-btn" data-index="${index}">❌ Delete</button>
          `;

          taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(index));
          taskItem.querySelector(".edit-btn").addEventListener("click", () => editTask(index));

          taskList.appendChild(taskItem);
      });
  }

  function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
  }

  function editTask(index) {
      const task = tasks[index];
      document.getElementById("task").value = task.taskText;
      document.getElementById("user").value = task.userText;
      document.getElementById("due-date").value = task.dueDate;
      document.getElementById("priority").value = task.priority;
      
      tasks.splice(index, 1); 
  }

  sortButton.addEventListener("click", () => {
      tasks.sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return sortAscending ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      sortAscending = !sortAscending;
      renderTasks();
  });
});