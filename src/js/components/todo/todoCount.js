import { $, $all, $closet, TODO_SELCTOR } from "../../utils/dom.js";
import {
  checkClassName,
  checkLocalName,
  getClassName,
  getClosestAttribute,
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
    // todoCount.querySelectorAll("a").forEach((each) => removeSelect(each));
    // setSelect(event);
  };

  const onClickHandler = (event) => {
    if (checkLocalName(event, "a")) {
      select(event);
      document.location.hash = getClassName(event);
      app.render();
      return;
    }
    if (checkClassName(event, "clear-completed")) {
      app.deleteAll(getClosestAttribute(event, ...TODO_SELCTOR.TODO_MEMBER_ID));
    }
  };
}
