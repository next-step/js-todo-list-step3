import { $, $closet, $closetAttr, TODO_SELCTOR } from "../../utils/dom.js";
import {
  checkClassName,
  checkKey,
  checkLocalName,
  getValue,
  isEmptyValue,
  setClass,
} from "../../utils/eventUtils.js";
import { ILLEGAL_MESSAGE } from "../../utils/Message.js";
import { todoItemTemplate } from "./todoItem.js";

export default function TodoList(app) {
  const $todoList = $(TODO_SELCTOR.TODO_LIST_CONTAINER);

  this.render = (members) => {
    members.forEach((member) => {
      const $todoMember = $(TODO_SELCTOR.CONTAINER(member.getId()), $todoList);
      const template = app
        .checkStatus(member.getId(), member.getTodoList())
        .map((item) => todoItemTemplate(item));
      $(TODO_SELCTOR.TODO_LIST, $todoMember).innerHTML = template.join("\n");
    });
  };

  const editing = (event) => {
    const target = $closet(event.target, TODO_SELCTOR.TODO_ID[0]);
    target && setClass(target, [TODO_SELCTOR.EDIT]);
  };

  const onClickHandler = (event) => {
    const target = event.target;
    if (checkClassName(event, "toggle")) {
      app.complete(
        $closetAttr(target, ...TODO_SELCTOR.MEMBER_ID),
        $closetAttr(target, ...TODO_SELCTOR.TODO_ID)
      );
      return;
    }
    if (checkClassName(event, "destroy")) {
      app.delete(
        $closetAttr(target, ...TODO_SELCTOR.MEMBER_ID),
        $closetAttr(target, ...TODO_SELCTOR.TODO_ID)
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
      $closetAttr(event.target, ...TODO_SELCTOR.MEMBER_ID),
      $closetAttr(event.target, ...TODO_SELCTOR.TODO_ID),
      getValue(event)
    );
  };

  const onChangeHandler = (event) => {
    if (!checkLocalName(event, "select")) return;
    app.changePriority(
      $closetAttr(event.target, ...TODO_SELCTOR.MEMBER_ID),
      $closetAttr(event.target, ...TODO_SELCTOR.TODO_ID),
      getValue(event)
    );
  };

  $todoList.addEventListener("click", onClickHandler);
  $todoList.addEventListener("dblclick", onDbClickHandler);
  $todoList.addEventListener("keydown", onKeyHandler);
  $todoList.addEventListener("change", onChangeHandler);
}
