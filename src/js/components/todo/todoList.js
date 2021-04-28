import { $, TODO_SELCTOR } from "../../utils/dom.js";
import {
  checkClassName,
  checkKey,
  checkLocalName,
  getClassLiId,
  getClosestAttribute,
  getValue,
  isEmptyValue,
} from "../../utils/eventUtils.js";
import { ILLEGAL_MESSAGE } from "../../utils/Message.js";
import { userAddButton } from "../user/user.js";
import TodoCount from "./todoCount.js";
import {
  todoItemTemplate,
  todoTemplate,
  todoAppendElement,
} from "./todoItem.js";

export default function TodoList(app) {
  const todoList = $(TODO_SELCTOR.TODO_LIST_CONTAINER);
  // const todoCount = new TodoCount(app);

  this.render = (members) => {
    members.forEach((member) => {
      const todoMember = $(
        TODO_SELCTOR.TODO_APP_CONTAINER(member.getId()),
        todoList
      );
      const template = member
        .getTodoList()
        .map((item) => todoItemTemplate(item));
      $(TODO_SELCTOR.TODO_LIST, todoMember).innerHTML = template.join("\n");
    });
  };

  this.editing = (id) => {
    todoList.querySelector(`li[data-id="${id}"]`).className = "editing";
  };

  const onClickHandler = (event) => {
    if (checkClassName(event, "toggle")) {
      app.complete(
        getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID),
        getClosestAttribute(event, ...TODO_SELCTOR.TODO_ID)
      );
      return;
    }
    if (checkClassName(event, "destroy")) {
      app.delete(
        getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID),
        getClosestAttribute(event, ...TODO_SELCTOR.TODO_ID)
      );
      return;
    }
  };

  const checkHash = {
    "#active": (item) => item.isCompleted() !== true,
    "#completed": (item) => item.isCompleted() === true,
    "": () => true,
    "#": () => true,
  };

  const onDbClickHandler = (event) => {
    if (checkClassName(event, "label")) {
      app.editing(getClassLiId(event));
    }
  };

  const onKeyHandler = (event) => {
    if (checkKey(event, "Enter")) {
      if (isEmptyValue(event)) {
        alert(ILLEGAL_MESSAGE["EMPTY_VALUE"]);
        return;
      }
      app.edit(getClassLiId(event), getValue(event));
    }
  };

  const onChangeHandler = (event) => {
    if (checkLocalName(event, "select")) {
      app.changePriority(getClassLiId(event), getValue(event));
    }
  };

  todoList.addEventListener("click", onClickHandler);
  // todoList.addEventListener("dblclick", onDbClickHandler);
  // todoList.addEventListener("keydown", onKeyHandler);
  // todoList.addEventListener("change", onChangeHandler);
}
