import TodoApp from "../todo/TodoApp.js";
import { memberItem } from "../../templete/templete.js";

export default class MemberList {
  constructor({ containerEl, membersData }) {
    this.containerEl = containerEl;
    this.memberListEl = document.createElement("ul");
    this.memberListEl.classList.add(
      "todoapp-list-container",
      "flex-column-container"
    );

    this.membersData = membersData;
    console.log(membersData);

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
      console.log(data);
      new TodoApp({ userId: data._id });
    });
  }
}
