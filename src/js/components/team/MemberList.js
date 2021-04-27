import TodoApp from "../todo/TodoApp.js";
import { teamApi, userApi } from "../../api/api.js";
import {
  memberItem,
  addMemberButton,
  goTeamList,
} from "../../templete/team.js";

export default class MemberList {
  constructor({ teamId, containerEl, membersData, onGetTeamList }) {
    this.teamId = teamId;
    this.containerEl = containerEl;
    this.membersData = membersData;
    this.handleGetTeamList = onGetTeamList;
    this.memberListEl = document.createElement("ul");
    this.memberListEl.classList.add(
      "todoapp-list-container",
      "flex-column-container"
    );

    this.render();
    this.init();
  }

  init() {
    this.containerEl.addEventListener("click", ({ target }) => {
      if (target.id === "add-user-button") {
        this.addUserButtonClickHandler();
      }
      if (target.id === "go-team-list-button") {
        this.handleGetTeamList();
      }
    });
  }

  addUserButtonClickHandler() {
    const memberId = prompt("새로운 팀원 이름을 입력해주세요");
    if (memberId.trim().length < 1) {
      alert("팀원의 이름을 입력해주세요.");
      return;
    }
    this.createMember(memberId);
  }

  setState(data) {
    this.membersData = data;
    this.render();
  }

  getTeam = async (teamId) => {
    await teamApi.get(teamId).then((data) => {
      this.setState(data.members);
    });
  };

  createMember = async (name) => {
    await userApi.create(this.teamId, name);
    this.getTeam(this.teamId);
  };

  render() {
    if (!this.membersData) return;
    this.containerEl.innerHTML = "";
    this.containerEl.append(this.memberListEl);
    this.memberListEl.innerHTML = this.membersData
      .map((data) => memberItem(data))
      .join("");

    this.containerEl.insertAdjacentHTML("afterbegin", goTeamList());
    this.memberListEl.insertAdjacentHTML("beforeend", addMemberButton());

    this.membersData.map((data) => {
      new TodoApp({ teamId: this.teamId, userId: data._id });
    });
  }
}
