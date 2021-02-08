import { loadTodoList } from "../../../../serverAPI/user/loadTodoList.js";
import { drawTodo } from "../../drawTodo.js";
import { updateCountText } from "../updateCountText.js";

export async function applyPriorityFilter(userID) {
  const teamID = localStorage.getItem("teamID");
  const userUL = document.getElementById(userID).querySelector("ul.todo-list");
  const todoList = await loadTodoList(teamID, userID);

  userUL.innerHTML = "";

  for (const todo of todoList.todoList) {
    drawTodo(userUL, todo, true);
  }

  updateCountText(userID);
}
