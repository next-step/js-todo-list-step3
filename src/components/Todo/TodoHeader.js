import {Component} from "@/core";
import {todoOfTeamStore} from "@/store/todoOfTeamStore";

export const TodoHeader = class extends Component {
  render () {
    const { name } = todoOfTeamStore.$state;
    return name ? `
        <span><strong>${name}</strong>'s Todo List</span>
    ` : '';
  }
}