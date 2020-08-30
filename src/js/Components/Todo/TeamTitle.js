import { teamTitleHTML } from '../../utils/templates/user.js';

function TeamTitle({ $target, name }) {
  this.init = () => {
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
