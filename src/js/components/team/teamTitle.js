import { $, TEAM_SELECTOR } from "../../utils/dom.js";

export default function TeamTitle() {
  const title = $(TEAM_SELECTOR.TITLE[1]);

  this.render = (name) => {
    $(TEAM_SELECTOR.TITLE[0], title).textContent = name;
  };
}
