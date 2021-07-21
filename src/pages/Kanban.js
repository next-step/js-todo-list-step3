import { getTeamAPI } from "../api/requests.js";
import TodoList from "../containers/TodoList/index.js";
import { $ } from "../utils/selectors.js";

class Kanban {
  constructor() {
    this.init();
  }
  init = async () => {
    //URLSEARCHPARM
    const teamId = window.location.href.match(/(?<=\?id=)\S*/g);
    const team = await getTeamAPI(teamId);
    console.log("team: ", team);
    this.list = [];
    team.members.forEach((member) => {
      this.list.push(
        new TodoList("#todoapp-list", { teamId: team._id, member })
      );
    });
    this.render();
    this.mount();
  };
  mount = () => {
    this.list.forEach((TodoList) => {
      TodoList.mount();
    });
  };
  render = () => {
    $("#app").innerHTML = `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo List</span>
      </h1>
      <ul id="todoapp-list" class="todoapp-list-container flex-column-container">
        ${this.list
          .map((TodoList) => {
            return TodoList.template();
          })
          .join()}
        <li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </li>
      </ul>
    `;
  };
}

new Kanban();

// function App() {
//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', e => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target.closest('.chip-container').querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })

//   const $addUserButton = document.querySelector('#add-user-button')
//   $addUserButton.addEventListener('click', () => {
//     const result = prompt('새로운 팀원 이름을 입력해주세요')
//   })
// }
// ${this.state.team.members
//   .map((member) => {
//     return this.todoList.template();
//   })
//   .join("")}
