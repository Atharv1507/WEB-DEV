// flags
let addTaskFlag = false;
let openLock = "fa-lock-open";
let closeLock = "fa-lock";
let colorsArray = ["lightpink", "lightgreen", "lightblue", "black"];

// Buttons
const addBtn = document.querySelector(".add-btn");

let ticketsArr = JSON.parse(localStorage.getItem("myTickets")) || [];

const ticketsfromLS = JSON.parse(localStorage.getItem("myTickets")) || [];
console.log(ticketsfromLS);

//variables

let modalPriorityColor = "lightpink";

// Elements

const modalCont = document.querySelector(".modal-cont");
const taskArea = document.querySelector(".textArea-cont");
const mainCont = document.querySelector(".main-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");

console.log(allPriorityColors);
// Toggle Modal Open and Close

addBtn.addEventListener("click", function () {
  if (addTaskFlag == false) {
    modalCont.style.display = "flex";
    addTaskFlag = true;
  } else {
    modalCont.style.display = "none";
    addTaskFlag = false;
  }
});

modalCont.addEventListener("keydown", function (e) {
  if (e.key == "Shift") {
    const task = taskArea.value;
    const id = shortid();
    console.log(id);
    generateTicket(task, modalPriorityColor, id);

    ticketsArr.push({
      ticketTask: task,
      ticketColor: modalPriorityColor,
      ticketId: id,
    });

    updateLocalStorage();
  }
});

function generateTicket(taskParam, modalPriorityColor, id) {
  const ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");

  ticketCont.innerHTML = `<div class="ticket-color" style="background-color:${modalPriorityColor}"></div>
            <div class="ticket-id">${id}</div>
            <div class="task-area">${taskParam}</div>
            <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>`;

  mainCont.appendChild(ticketCont);
  modalCont.style.display = "none";
  addTaskFlag = false;

  // handle the lock
  handleLock(ticketCont);

  handleColor(ticketCont);
}

function init() {
  if (localStorage.getItem("myTickets")) {
    ticketsfromLS.forEach(function (ticket) {
      generateTicket(ticket.ticketTask, ticket.ticketColor, ticket.ticketId);
    });
  }
}

init();

// Priority Color Setting for Ticket

allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener("click", function () {
    allPriorityColors.forEach(function (priorityColor) {
      priorityColor.classList.remove("active");
    });

    colorElem.classList.add("active");

    modalPriorityColor = colorElem.classList[0];
    console.log(modalPriorityColor);
  });
});

// Handle the Lock to update ticket Task
function handleLock(ticket) {
  const lockContainer = ticket.querySelector(".ticket-lock");
  const lockIcon = lockContainer.children[0];

  lockIcon.addEventListener("click", function () {
    const ticketTask = ticket.querySelector(".task-area");
    if (lockIcon.classList.contains(closeLock)) {
      lockIcon.classList.remove(closeLock);
      lockIcon.classList.add(openLock);

      // tickt task editable
      ticketTask.setAttribute("contenteditable", "true");
    } else {
      lockIcon.classList.remove(openLock);
      lockIcon.classList.add(closeLock);
      // tickt task not editable
      ticketTask.setAttribute("contenteditable", "false");
    }
  });
}

// handle Priority Color

function handleColor(ticket) {
  const ticketColorBand = ticket.querySelector(".ticket-color");
  ticketColorBand.addEventListener("click", function () {
    let currentColor = ticketColorBand.style.backgroundColor;
    // lightgreen
    // findIndex
    let currentColorIdx = colorsArray.findIndex(function (color) {
      return currentColor == color;
    });
    currentColorIdx++;
    const nextColorIdx = currentColorIdx % colorsArray.length;
    const nextColor = colorsArray[nextColorIdx];
    //

    ticketColorBand.style.backgroundColor = nextColor;
  });
}

function updateLocalStorage() {
  localStorage.setItem("myTickets", JSON.stringify(ticketsArr));
}
