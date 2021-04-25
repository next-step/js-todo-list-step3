import TodoApp from "../todo/TodoApp.js";
import { userApi } from "../../api/api.js";
import { memberItem, addMemberButton } from "../../templete/team.js";

export default class MemberList {
  constructor({ teamId, containerEl, membersData }) {
    this.teamId = teamId;
    this.containerEl = containerEl;
    this.membersData = membersData;
    this.memberListEl = document.createElement("ul");
    this.memberListEl.classList.add(
      "todoapp-list-container",
      "flex-column-container"
    );

    this.init();
    this.render();
  }

  init() {
    this.containerEl.innerHTML = "";
    this.containerEl.append(this.memberListEl);
    this.memberListEl.addEventListener("click", ({ target }) => {
      if (target.id !== "add-user-button") return;
      const memberId = prompt("새로운 팀원 이름을 입력해주세요");
      this.createMember(memberId);
    });
  }

  getTeam = async (teamId) => {
    await teamApi.get(teamId).then((data) => {
      this.memberList.setState(data.members);
    });
  };

  createMember = async (name) => {
    await userApi.create(this.teamId, name);
    this.render();
  };

  render() {
    if (!this.membersData) return;
    this.memberListEl.innerHTML = this.membersData
      .map((data) => memberItem(data))
      .join("");

    this.memberListEl.insertAdjacentHTML("beforeend", addMemberButton());

    this.membersData.map((data) => {
      new TodoApp({ teamId: this.teamId, userId: data._id });
    });
  }
}
