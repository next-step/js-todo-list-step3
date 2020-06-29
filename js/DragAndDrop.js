let dragSrcEl = null;
let dragList = null;
let dropList = null;

function handleDragStart(e) {
  dragSrcEl = this;
  dragList = e.target.closest(".todo-list");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);
  this.classList.add("dragElem");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  this.classList.add("over");
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  dropList = this.closest(".todo-list");
  if (dragSrcEl === this) {
    return;
  }
  if (dragList === dropList) {
    dropList.removeChild(dragSrcEl);
  } else {
    dragList.removeChild(dragSrcEl);
  }
  const dropHTML = e.dataTransfer.getData("text/html");
  this.insertAdjacentHTML("beforebegin", dropHTML);
  const dropElem = this.previousSibling;
  addDnDHandlers(dropElem);
  this.classList.remove("over");
  return false;
}

function handleDragEnd(e) {
  this.classList.remove("over");
}

function addDnDHandlers(elem) {
  elem.setAttribute("draggable", true);
  elem.addEventListener("dragstart", handleDragStart, false);
  elem.addEventListener("dragenter", handleDragEnter, false);
  elem.addEventListener("dragover", handleDragOver, false);
  elem.addEventListener("dragleave", handleDragLeave, false);
  elem.addEventListener("drop", handleDrop, false);
  elem.addEventListener("dragend", handleDragEnd, false);
}

const cols = document.querySelectorAll(".todo-list-item");
[].forEach.call(cols, addDnDHandlers);
