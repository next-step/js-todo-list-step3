import { $, TEAM_SELECTOR } from "../../utils/dom.js";

export default function TeamTitle() {
  const title = $(TEAM_SELECTOR.TEAM_TITLE);

  this.render = (name) => {
    $(TEAM_SELECTOR.TEAM_TITLE_TAG, title).textContent = name;
  };
}
