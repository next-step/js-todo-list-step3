import {Component} from "../../core/Component.js";
import {todoOfTeamStore} from "../../store/todoOfTeamStore.js";

export const TodoHeader = class extends Component {
  render () {
    const { name } = todoOfTeamStore.$state;
    return name ? `
        <span><strong>${name}</strong>'s Todo List</span>
    ` : '';
  }
}