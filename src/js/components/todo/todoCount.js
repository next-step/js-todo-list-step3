import { $, $all, $closet, TODO_SELCTOR } from "../../utils/dom.js";
import {
  checkClassName,
  checkLocalName,
  getClosestAttribute,
  removeClass,
  setClass,
} from "../../utils/eventUtils.js";

export default function TodoCount(app) {
  this.render = () => {
    this.todoCount = $all(TODO_SELCTOR.TODO_COUNTER[1]);
    this.todoCount.forEach((count) =>
      count.addEventListener("click", onClickHandler)
    );
    this.todoCount.forEach((count) => {
      const closet = $closet(
        `${TODO_SELCTOR.TODO_MEMBER_ID[0]}[${TODO_SELCTOR.TODO_MEMBER_ID[1]}]`,
        count
      );
      $("strong", count).textContent = $all(
        `${TODO_SELCTOR.TODO_ID[0]}[${TODO_SELCTOR.TODO_ID[1]}]`,
        closet
      ).length;
    });
  };

  const select = (event) => {
    const allFilter = $all(
      TODO_SELCTOR.TODO_SELECTED[0],
      $closet(TODO_SELCTOR.TODO_COUNTER[0], event.target)
    );
    allFilter.forEach((each) =>
      removeClass(each, [TODO_SELCTOR.TODO_SELECTED[1]])
    );
    setClass(event.target, [TODO_SELCTOR.TODO_SELECTED[1]]);
    app.changeStatus(
      getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID),
      getClosestAttribute(event, ...TODO_SELCTOR.TODO_FILTERS)
    );
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    if (checkLocalName(event, "a")) {
      select(event);
      return;
    }
    if (checkClassName(event, "clear-completed")) {
      app.deleteAll(getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID));
    }
  };
}
