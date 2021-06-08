import { $, TEAM_SELECTOR } from "../../utils/dom.js";
import { ASK_MESSAGE, ILLEGAL_MESSAGE } from "../../utils/Message.js";
import { checkEmpty } from "../../utils/stringUtils.js";

export default function TeamEditor(app) {
  const createButton = $(TEAM_SELECTOR.ADD_BUTTON);

  const onTeamCreateHandler = () => {
    const teamName = prompt(ASK_MESSAGE.ADD_TEAM);
    if (checkEmpty(teamName)) {
      alert(ILLEGAL_MESSAGE.EMPTY_VALUE);
      return;
    }
    app.add(teamName);
  };

  createButton.addEventListener("click", onTeamCreateHandler);
}
