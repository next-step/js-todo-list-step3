import { addTodo } from "../../../serverAPI/user/addTodo.js";
import { drawTodo } from "../drawTodo.js";
import { applySelectedFilter } from "./filters/filterRules.js";
import { updateCountText } from "./updateCountText.js";

function getUserID(target) {
  const liContainingID = target.closest("li[id]") ?? null;
  return liContainingID === null ? null : liContainingID.id;
}

export function initInputContainer(sectionInputContainer) {
  const newTodoInput = sectionInputContainer.querySelector("input.new-todo");
  newTodoInput.addEventListener("keyup", onKeyUpNewTodoInput);
}

function isValidInput(text) {
  return text.trim().length > 0;
}

async function onKeyUpNewTodoInput({ target, key }) {
  if (key !== "Enter") return;
  if (!isValidInput(target.value)) return;

  target.toggleAttribute("disabled");
  const teamID = localStorage.getItem("teamID");
  const userID = getUserID(target);
  const newTodo = await addTodo(teamID, userID, target.value.trim());

  drawTodo(
    document.querySelector(`li#${getUserID(target)} ul.todo-list`),
    newTodo
  );
  target.toggleAttribute("disabled");
  target.value = "";
  target.focus();

  applySelectedFilter(userID);
  updateCountText(userID);
}
