import { $all, $closetAttr, TODO_SELCTOR } from "../../utils/dom.js";
import { checkKey, getValue, isEmptyValue } from "../../utils/eventUtils.js";
import { ILLEGAL_MESSAGE } from "../../utils/Message.js";

export default function TodoInput(app) {
  this.render = () => {
    this.todoInput = $all(TODO_SELCTOR.TODO_INPUT);
    this.todoInput.forEach((input) =>
      input.addEventListener("keydown", onKeyHandler)
    );
  };

  const onKeyHandler = (event) => {
    event.stopPropagation();
    if (!checkKey(event, "Enter")) return;
    if (isEmptyValue(event)) {
      alert(ILLEGAL_MESSAGE.EMPTY_VALUE);
      return;
    }
    app.add(
      $closetAttr(event.target, ...TODO_SELCTOR.TODO_MEMBER_ID),
      getValue(event)
    );
    event.target.value = "";
  };
}
