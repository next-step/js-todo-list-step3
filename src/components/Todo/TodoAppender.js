import {Component} from "../../core/Component.js";

export const TodoAppender = class extends Component {
  render () {
    return `
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  }
}