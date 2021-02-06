import { createElement } from "../../utils/createElement.js";
import $api from "../../api/index.js";

import TodoListContainer from "./TodoListContainer.js";

const template = ({ name }) => `
  <div>
    <h1 class="team-title">
      <span><strong>${name}</strong>'s Todo List</span>
    </h1>
    <ul class="todoapp-list-container flex-column-container">
      <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </li>
    </ul>
  </div>
`;

export default function Kanban({ team }) {
  const dom = createElement(template(team));
  const todoAppListContainer = dom.querySelector(".todoapp-list-container");
  const memberCreateBtn = dom.querySelector(".add-user-button-container");

  const init = async () => {
    await render();
  };

  const render = async () => {
    const { members } = await $api.team.getById(team._id);

    todoAppListContainer.innerHTML = "";
    members.forEach(renderEachMember);
    todoAppListContainer.appendChild(memberCreateBtn);
  };

  const renderEachMember = (member) => {
    const todoListContainer = TodoListContainer({ member });
    todoAppListContainer.appendChild(todoListContainer);
  };

  init();

  return dom;
}
