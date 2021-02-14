import Component from "./core/Component.js";
import { memberAPI, teamAPI } from "./api/api.js";
import TodoApp from "./components/TodoApp.js";
import MemberAppender from "./components/MemberAppender.js";
class Member extends Component {
  async setup() {
    const teamID = location.hash.split("#")[1];
    const team = await teamAPI.getTeam(teamID);
    const members = team.members;
    this.state = {
      teamID,
      team,
      members,
    };
  }
  template() {
    const { team } = this.state;
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>${team.name}</strong>'s Todo List</span>
      </h1>
      <ul class="todoapp-list-container flex-column-container">
      <li class="add-user-button-container">
        
      </li>
      </ul>
    `;
  }
  mounted() {
    const $todoListContainer = document.querySelector(
      ".todoapp-list-container"
    );
    const $addUserBtnContainer = document.querySelector(
      ".add-user-button-container"
    );
    const { teamID, members } = this.state;
    members.forEach((member) => {
      const $todoappContainer = document.createElement("li");
      $todoappContainer.classList.add("todoapp-container");
      $todoappContainer.setAttribute("id", member._id);
      new TodoApp($todoappContainer, { member, teamID });
      $todoListContainer.insertBefore($todoappContainer, $addUserBtnContainer);
    });
    new MemberAppender($addUserBtnContainer, {
      teamID,
      addMember: this.addMember.bind(this),
    });
  }
  async addMember() {
    const { teamID } = this.state;
    const newMemberName = prompt("새로운 팀원 이름을 입력해주세요.");
    await memberAPI.addMember(teamID, newMemberName);
    const members = await teamAPI.getTeam(teamID).then((team) => team.members);
    this.setState({ members });
  }
}
new Member(document.getElementById("app"));

// function TodoApp() {
//   const $todoApps = document.querySelector(".todoapp-list-container");
//   $todoApps.addEventListener("click", (e) => {
//     const $target = e.target;
//     const targetClassList = $target.classList;
//     if (targetClassList.contains("chip")) {
//       const $chipSelect = $target
//         .closest(".chip-container")
//         .querySelector("select");
//       $target.classList.add("hidden");
//       $chipSelect.classList.remove("hidden");
//     }
//   });

//   const $addUserButton = document.querySelector("#add-user-button");
//   $addUserButton.addEventListener("click", () => {
//     const result = prompt("새로운 팀원 이름을 입력해주세요");
//   });
// }
