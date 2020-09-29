import { teamTitleHTML } from '../../utils/templates/team.js';
import { checkTarget } from '../../utils/validation.js';

function TeamTitle({ $target, name }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;
    this.name = name;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = teamTitleHTML(this.name);
  };

  this.init();
}

export default TeamTitle;
