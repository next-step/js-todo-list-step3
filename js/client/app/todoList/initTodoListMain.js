import { onClickTodoList } from "./todoListEventHandlers/onClickTodoList.js";
import { onChangeTodoList } from "./todoListEventHandlers/onChangeTodoList.js";
import { onDoubleClickTodoList } from "./todoListEventHandlers/onDoubleClickTodoList.js";
import { onKeyUpTodoList } from "./todoListEventHandlers/onKeyUpTodoList.js";

export function initTodoListMain(sectionMain) {
  const todolist = sectionMain.querySelector("ul.todo-list");
  todolist.addEventListener("click", onClickTodoList);
  todolist.addEventListener("change", onChangeTodoList);
  todolist.addEventListener("dblclick", onDoubleClickTodoList);
  todolist.addEventListener("keyup", onKeyUpTodoList);
}
