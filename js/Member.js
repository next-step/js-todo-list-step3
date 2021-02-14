import Component from "./core/Component.js";
import { teamAPI } from "./api/api.js";
import TodoApp from "./components/TodoApp.js";

class Member extends Component {
  async setup() {
    this.teamID = location.hash.split("#")[1];
    this.team = await teamAPI.getTeam(this.teamID);
    this.members = this.team.members;
  }
  template() {
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>${this.team.name}</strong>'s Todo List</span>
      </h1>
      <ul class="todoapp-list-container flex-column-container">
      </ul>
    `;
  }
  mounted() {
    const $todoListContainer = document.querySelector(
      ".todoapp-list-container"
    );
    this.members.forEach((member) => {
      const $todoappContainer = document.createElement("li");
      $todoappContainer.classList.add("todoapp-container");
      $todoappContainer.setAttribute("id", member.id);
      new TodoApp($todoappContainer, { member, teamID: this.teamID });
      $todoListContainer.appendChild($todoappContainer);
    });
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

// const team = {
//   id: "test",
//   name: "testName",
//   members: [
//     {
//       _id: "member1",
//       name: "member1",
//       todoList: [
//         {
//           _id: "todo1",
//           contents: "string1",
//           priority: "NONE",
//           isCompleted: true,
//         },
//         {
//           _id: "todo2",
//           contents: "string2",
//           priority: "SECOND",
//           isCompleted: false,
//         },
//         {
//           _id: "todo3",
//           contents: "string3",
//           priority: "FIRST",
//           isCompleted: false,
//         },
//       ],
//     },
//     {
//       _id: "member2",
//       name: "member2",
//       todoList: [
//         {
//           _id: "todo1",
//           contents: "string1",
//           priority: "FIRST",
//           isCompleted: false,
//         },
//         {
//           _id: "todo2",
//           contents: "string2",
//           priority: "NONE",
//           isCompleted: true,
//         },
//         {
//           _id: "todo3",
//           contents: "string3",
//           priority: "SECOND",
//           isCompleted: true,
//         },
//       ],
//     },
//   ],
// };
