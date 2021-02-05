import { initAddTodoList } from "./addItem.js";
import { initCheckTodoList } from "./checkItem.js";
import { initUpdateTodoList } from "./updateItem.js";
import { initDeleteTodoList } from "./deleteItem.js";
import { initPrioritizeTodoList } from "./prioritizeItem.js";
import { initDeleteAllTodoList } from "./deleteAllItems.js";
import { initAddMember } from "./addMember.js";
import { getAllTodoList } from "./showTodoList.js";
import { initTodolistButton } from "./controlTodoButton.js";

const initTodoList = () => {
  getAllTodoList();
  initAddMember();
  initAddTodoList();
  initCheckTodoList();
  initUpdateTodoList();
  initDeleteTodoList();
  initPrioritizeTodoList();
  initDeleteAllTodoList();
  initTodolistButton();
};

initTodoList();
