import { $, TODO_SELCTOR } from "../../utils/dom.js";
import {
  checkClassName,
  checkKey,
  checkLocalName,
  getClassLiId,
  getClosestAttribute,
  getCloset,
  getValue,
  isEmptyValue,
  setClass,
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
      $(TODO_SELCTOR.TODO_LIST[1], todoMember).innerHTML = template.join("\n");
    });
  };

  const editing = (event) => {
    const target = getCloset(event, TODO_SELCTOR.TODO_ID[0]);
    target && setClass(target, TODO_SELCTOR.TODO_EDIT);
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

  const onDbClickHandler = (event) => {
    if (!checkClassName(event, "label")) return;
    editing(event);
  };

  const onKeyHandler = (event) => {
    if (!checkKey(event, "Enter")) return;
    if (isEmptyValue(event)) {
      alert(ILLEGAL_MESSAGE["EMPTY_VALUE"]);
      return;
    }
    app.edit(
      getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID),
      getClosestAttribute(event, ...TODO_SELCTOR.TODO_ID),
      getValue(event)
    );
  };

  const onChangeHandler = (event) => {
    if (!checkLocalName(event, "select")) return;
    app.changePriority(
      getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID),
      getClosestAttribute(event, ...TODO_SELCTOR.TODO_ID),
      getValue(event)
    );
  };

  todoList.addEventListener("click", onClickHandler);
  todoList.addEventListener("dblclick", onDbClickHandler);
  todoList.addEventListener("keydown", onKeyHandler);
  todoList.addEventListener("change", onChangeHandler);
}
