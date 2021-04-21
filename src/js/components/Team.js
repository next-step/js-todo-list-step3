import { getEl, getUrlParam } from "@js/util";
import { todoAppTemplate, addMemberBtnTemplate } from "@js/template";
import { getTeam } from "@lib/api";

import Store from "@lib/store";
import TodoApp from "@components/TodoApp";
import { TODO_STORE } from "@constants/model";

class Team {
  constructor(store) {
    this.store = store;
    this.teamId = getUrlParam("id");
    this.teamName = getUrlParam("name");
    this.container = getEl(".todoapp-list-container");
    this.init();
  }

  init() {
    this.store.on('members', this.render.bind(this));
    this.setMembers();
    getEl("#user-title strong").innerText = this.teamName;
  }

  async setMembers() {
    const { data: { members } } = await getTeam(this.teamId);
    this.store.set({
      members: [...members],
    });
  }

  render() {
    const { members } = this.store.get();

    this.container.innerHTML = members
      .map((member) => {
        const todoStore = new Store(TODO_STORE);
        new TodoApp({ ...member, teamId: this.teamId, store: todoStore });
        return todoAppTemplate(member._id, member.name, member.todoList.length);
      })
      .join("") + addMemberBtnTemplate();
  }
}

export default Team;
