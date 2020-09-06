import { TEAM_TITLE_ID } from "../../utils/data.js";
import { teamTitleTemplate, errorCallTemplate } from "../../utils/template.js";

export default function TeamTitle({ $target, teamName }) {
  this.init = () => {
    if (!(this instanceof TeamTitle)) {
      throw new Error(errorCallTemplate);
    }
    this.$todoTitle = document.createElement("h1");
    this.$todoTitle.id = TEAM_TITLE_ID;
    this.$todoTitle.setAttribute("username", "sky");
    this.state = {
      name: teamName
    };

    this.render();
    $target.appendChild(this.$todoTitle);
  };

  this.render = () => {
    this.$todoTitle.innerHTML = teamTitleTemplate(this.state.name);
  };

  this.init();
}