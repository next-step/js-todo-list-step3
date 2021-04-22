import { getEl, getUrlParam, containsClass } from "@js/util";
import { todoAppTemplate, addMemberBtnTemplate } from "@js/template";
import { getMembers, addMember } from "@lib/api";
import { MESSAGES } from "@constants/constant";

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
    this.store.on("members", this.render.bind(this));
    this.setMembers();
    this.container.addEventListener("click", this.clickDelegationHandler.bind(this));
    getEl("#user-title strong").innerText = this.teamName;
  }

  async setMembers() {
    const {
      data: { members },
    } = await getMembers(this.teamId);
    this.store.set({
      members: [...members],
    });
  }

  clickDelegationHandler({ target }) {
    if (containsClass(target, "add-user-button")) return this._addMemberHandler();
  }

  async _addMemberHandler() {
    const name = prompt(MESSAGES.ADD_MEMBER);
    if (name === null) return;
    await addMember({ teamId: this.teamId, name });
    this.setMembers();
  }

  render() {
    const { members } = this.store.get();

    this.container.innerHTML =
      members
        .map((member) => {
          const todoStore = new Store(TODO_STORE);
          new TodoApp({ ...member, teamId: this.teamId, store: todoStore });
          return todoAppTemplate(member);
        })
        .join("") + addMemberBtnTemplate();
  }
}

export default Team;
