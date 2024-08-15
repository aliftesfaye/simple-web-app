document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask(taskInput.value);
    taskInput.value = "";
  });

  function addTask(task) {
    fetch("add_task.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadTasks();
        }
      });
  }

  function deleteTask(id) {
    fetch("delete_task.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadTasks();
        }
      });
  }

  function loadTasks() {
    fetch("get_tasks.php")
      .then((response) => response.json())
      .then((data) => {
        taskList.innerHTML = "";
        data.tasks.forEach((task) => {
          const tr = document.createElement("tr");

          const taskTd = document.createElement("td");
          taskTd.textContent = task.task;
          tr.appendChild(taskTd);

          const actionsTd = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.className = "delete";
          deleteButton.onclick = () => deleteTask(task.id);
          actionsTd.appendChild(deleteButton);
          tr.appendChild(actionsTd);

          taskList.appendChild(tr);
        });
      });
  }

  loadTasks();
});
