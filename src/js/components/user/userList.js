import { $, TODO_SELCTOR } from "../../utils/dom.js";
import { todoAppendElement } from "../todo/todoItem.js";
import { userAddButton } from "./user.js";

export default function UserList() {
  const $todoList = $(TODO_SELCTOR.TODO_LIST_CONTAINER);

  this.render = (members) => {
    $todoList.innerHTML = "";
    members.forEach((member) => todoAppendElement(member, $todoList));
    userAddButton($todoList);
  };
}
