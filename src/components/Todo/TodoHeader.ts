import {Component} from "@/core";
import {todoOfTeamStore} from "@/store/todoOfTeamStore";
import {REMOVE_TEAM, teamStore} from "@/store";

export const TodoHeader = class extends Component {

  protected template () {
    const { name } = todoOfTeamStore.$state;
    return name ? `
        <span><strong>${name}</strong>'s Todo List</span>
        <button type="button" data-ref="removeMember">⌫</button>
    ` : '';
  }

  protected setEvent () {
    this.addEvent('removeMember', 'click', () => {
      if (!confirm('현재 팀을 삭제하시겠습니까?')) return;
      teamStore.dispatch(REMOVE_TEAM, todoOfTeamStore.$state._id);
    });
  }
}
