import TodoApp from "../todo/TodoApp.js";
import { memberItem } from "../../templete/templete.js";

export default class MemberList {
  constructor({ teamId, containerEl, membersData }) {
    this.teamId = teamId;
    this.containerEl = containerEl;
    this.memberListEl = document.createElement("ul");
    this.memberListEl.classList.add(
      "todoapp-list-container",
      "flex-column-container"
    );

    this.membersData = membersData;

    this.init();
    this.render();
  }

  init() {
    this.containerEl.innerHTML = "";
    this.containerEl.append(this.memberListEl);
  }

  render() {
    if (!this.membersData) return;
    this.memberListEl.innerHTML = this.membersData
      .map((data) => memberItem(data))
      .join("");

    this.membersData.map((data) => {
      new TodoApp({ teamId: this.teamId, userId: data._id });
    });
  }
}
