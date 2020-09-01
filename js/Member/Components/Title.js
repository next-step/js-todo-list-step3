import { validateInstance, validateName } from "../../Common/utils.js";

function Title($target, name) {
  validateInstance(Title, this);
  validateName(name);
  this.$target = $target;
  this.state = { name };

  this.setState = (state) => {
    if (state?.name) {
      validateName(state.name);
      this.state.name = state.name;
    }
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
        <span><strong>${this.state.name}</strong>'s Todo List</span>
    `;
  };

  this.render();
}

export default Title;
