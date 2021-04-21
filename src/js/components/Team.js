import { getEl, getUrlParam } from "@js/util";
import { addUserButtonTemplate } from "@js/template";
import { getTeam } from "@lib/api";

import Store from "@lib/store";
import TodoApp from "@components/TodoApp";
import { TODO_STORE } from "@constants/model";

class Team {
  constructor() {
    this.teamId = getUrlParam("id");
    this.teamName = getUrlParam("name");
    this.container = getEl(".todoapp-list-container");
    this.init();
  }

  async init() {
    getEl("#user-title strong").innerText = this.teamName;
    const {
      data: { members },
    } = await getTeam(this.teamId);

    members.forEach((member) => {
      const todoStore = new Store(TODO_STORE);
      new TodoApp({ ...member, teamId: this.teamId, container: this.container, store: todoStore });
    });
    this.container.innerHTML += addUserButtonTemplate();
  }
}

export default Team;
