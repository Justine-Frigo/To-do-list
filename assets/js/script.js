const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskItems");
const removeCompletedButton = document.getElementById("removeCompletedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.draggable = true;
    taskElement.dataset.index = index;

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("change", () => {
      toggleTaskCompleted(index);
    });

    const taskLabel = document.createElement("label");
    taskLabel.textContent = task.title;
    taskLabel.htmlFor = `task-${index}`;

    const corbeilleImage = document.createElement("img");
    corbeilleImage.src = "./assets/image/trash-can-solid.svg";
    corbeilleImage.alt = "delete";
    corbeilleImage.classList.add("corbeille-img");
    corbeilleImage.addEventListener("click", () => {
      deleteTask(index);
    });

    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskLabel);
    taskElement.appendChild(corbeilleImage);

    if (task.completed) {
      taskElement.classList.add("task-completed");
    }

    taskList.appendChild(taskElement);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(event) {
  event.preventDefault();

  const newTaskTitle = taskInput.value.trim();

  if (newTaskTitle === "") {
    return;
  }

  tasks.push({ title: newTaskTitle, completed: false });
  taskInput.value = "";

  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  renderTasks();
}

function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;

  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);

  renderTasks();
}

addTaskButton.addEventListener("click", addTask);
removeCompletedButton.addEventListener("click", clearCompletedTasks);

renderTasks();

let draggedItem = null;

taskList.addEventListener("dragstart", (e) => {
  draggedItem = e.target;
  e.target.style.opacity = "0.5";
});

taskList.addEventListener("dragend", () => {
  draggedItem.style.opacity = "1";
});

taskList.addEventListener("dragover", (e) => {
  e.preventDefault();
});

taskList.addEventListener("dragenter", (e) => {
  e.preventDefault();
  if (e.target.tagName === "LI") {
    e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  }
});

taskList.addEventListener("dragleave", (e) => {
  if (e.target.tagName === "LI") {
    e.target.style.backgroundColor = "";
  }
});

taskList.addEventListener("drop", (e) => {
  if (e.target.tagName === "LI") {
    const dropIndex = e.target.dataset.index;
    const dragIndex = draggedItem.dataset.index;
    const temp = tasks[dropIndex];
    tasks[dropIndex] = tasks[dragIndex];
    tasks[dragIndex] = temp;
    renderTasks();
  }
});
