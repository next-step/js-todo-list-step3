import { $all, TODO_SELCTOR } from "../../utils/dom.js";
import {
  checkKey,
  getClosestAttribute,
  getValue,
  isEmptyValue,
} from "../../utils/eventUtils.js";
import { ILLEGAL_MESSAGE } from "../../utils/Message.js";

export default function TodoInput(app) {
  this.render = () => {
    this.todoInput = $all(TODO_SELCTOR.TODO_INPUT);
    this.todoInput.forEach((input) =>
      input.addEventListener("keydown", onKeyHandler)
    );
  };

  const onKeyHandler = (event) => {
    console.log(event);
    console.log(event.target);
    if (!checkKey(event, "Enter")) return;
    if (isEmptyValue(event)) {
      alert(ILLEGAL_MESSAGE.EMPTY_VALUE);
      return;
    }
    app.add(
      getClosestAttribute(
        event,
        TODO_SELCTOR.TODO_APP,
        TODO_SELCTOR.TODO_MEMBER_ID
      ),
      getValue(event)
    );
    event.target.value = "";
  };
}
