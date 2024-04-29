// retrieving HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskItems");
const removeCompletedButton = document.getElementById("removeCompletedBtn");

// localStorage data recovery
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// function to display the to-do list
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    const taskCheckbox = document.createElement("input");
    const taskLabel = document.createElement("label");
    const corbeilleImage = document.createElement("img");

    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("change", () => {
      toggleTaskCompleted(index);
    });

    taskLabel.textContent = task.title;
    taskLabel.htmlFor = `task-${index}`;

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

  // data storage in the localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to add a new task
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

// function for deleting a task
function deleteTask(index) {
  tasks.splice(index, 1);

  renderTasks();
}

// function to mark or unmark a task as completed
function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;

  renderTasks();
}

// function for deleting completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);

  renderTasks();
}

// event listener added
addTaskButton.addEventListener("click", addTask);
removeCompletedButton.addEventListener("click", clearCompletedTasks);

// initial display of the to-do list
renderTasks();
