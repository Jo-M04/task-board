// Function to allow dropping tasks
function allowDrop(ev) {
  ev.preventDefault();
}

// Function to drag a task
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Function to drop a task
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

// Get the modal element
var modal = document.getElementById("addTaskModal");

// Get the button that opens the modal
var addTaskBtn = document.getElementById("addTaskBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// Get the form element
var taskForm = document.getElementById("taskForm");

// Get the first column (To Do column)
var toDoColumn = document.getElementById("todo-column");

// Get the third column (Completed column)
var completedColumn = document.getElementById("completed-column");

// Function to check if a date is within a certain number of days from the current date
function isWithinDays(date, days) {
  const currentDate = new Date();
  const diffTime = Math.abs(date.getTime() - currentDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days;
}

// Function to update task card color based on due date proximity
function updateTaskCardColor() {
  const taskCards = document.querySelectorAll(".task-card");
  taskCards.forEach((taskCard) => {
    const taskDateStr = taskCard
      .querySelector("p:nth-child(2)")
      .textContent.split(":")[1]
      .trim();
    const taskDate = new Date(taskDateStr);
    if (isWithinDays(taskDate, 3)) {
      taskCard.style.backgroundColor = "red";
    } else if (isWithinDays(taskDate, 7)) {
      taskCard.style.backgroundColor = "yellow";
    } else {
      taskCard.style.backgroundColor = "#fff";
    }
  });
}

// Call updateTaskCardColor initially to apply color on page load
updateTaskCardColor();

// When the user clicks the button, open the modal
addTaskBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user submits the form, add the task as a draggable box to the first column
taskForm.onsubmit = function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var taskName = document.getElementById("taskName").value;
  var taskDate = document.getElementById("taskDate").value;
  var taskDescription = document.getElementById("taskDescription").value;

  // Create task card as a draggable box
  var taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.id = "task-" + Date.now(); // Unique ID for each task
  taskCard.draggable = true;
  taskCard.addEventListener("dragstart", drag);
  taskCard.innerHTML = `
      <h3>${taskName}</h3>
      <p>Date: ${taskDate}</p>
      <p>${taskDescription}</p>
    `;

  // Add task card to the first column
  toDoColumn.appendChild(taskCard);

  // Update task card color
  updateTaskCardColor();

  // Close the modal
  modal.style.display = "none";

  // Clear form fields
  taskForm.reset();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to mark a task as completed
function markAsCompleted(taskId) {
  var taskCard = document.getElementById(taskId);
  taskCard.style.backgroundColor = "green";
  completedColumn.appendChild(taskCard);
}
