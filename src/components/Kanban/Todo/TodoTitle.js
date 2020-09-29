import { CLASS_SELECTOR } from "../../../utils/constants.js";
import { todoTitle } from "../../../utils/templates.js";

export default function TodoTitle($todoappContainer, memberName) {
  const initElements = () => {
    this.$todoTitle = document.createElement("h2");
    this.$todoTitle.innerHTML = todoTitle(memberName);
  };

  this.render = () => {
    $todoappContainer.appendChild(this.$todoTitle);
  };

  const init = () => {
    initElements();
    this.render();
  };

  init();
}
