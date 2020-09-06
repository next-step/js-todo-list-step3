import { errorCallTemplate, todoErrorTemplate } from "../../utils/template.js";
import { MAIN } from "../../utils/data.js";

export default function TodoError({ $target, error }) {
  this.init = () => {
    if (!(this instanceof TodoError)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      error,
    };
    this.$todoError = document.createElement("section");
    this.$todoError.classList.add(MAIN);
  };

  this.setState = (err) => {
    this.state.error = err;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = "";
    $target.appendChild(this.$todoError);
    this.$todoError.innerHTML = todoErrorTemplate(this.state.error);
  };

  this.init();
}
