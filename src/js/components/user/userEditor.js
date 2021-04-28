import { $, MEMBER_SELECTOR } from "../../utils/dom.js";
import { ASK_MESSAGE, ILLEGAL_MESSAGE } from "../../utils/Message.js";
import { checkEmpty } from "../../utils/stringUtils.js";

export default function UserEditor(app) {
  let selectUserName;

  this.changeUser = (name) => (selectUserName = name);

  const onUserCreateHandler = () => {
    const userName = prompt(ASK_MESSAGE.ADD_NAME);
    if (checkEmpty(userName)) {
      alert(ILLEGAL_MESSAGE.EMPTY_VALUE);
      return;
    }
    app.add(userName);
  };

  this.render = () => {
    this.createButton = $(MEMBER_SELECTOR.ADD_BUTTON);
    this.createButton.addEventListener("click", onUserCreateHandler);
  };
}
