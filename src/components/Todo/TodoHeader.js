import {Component} from "../../core/Component.js";
import {teamStore} from "../../store/teamStore.js";

export const TodoHeader = class extends Component {
  render () {
    const { name } = teamStore.$state.team;
    return name ? `
        <span><strong>${name}</strong>'s Todo List</span>
    ` : '';
  }
}