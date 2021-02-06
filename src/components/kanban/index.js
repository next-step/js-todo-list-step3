import { createElement } from "../../utils/createElement.js";
import $api from "../../api/index.js";

import TodoContainer from "./TodoContainer.js";

const template = `
  <div>
    <h1>
      <span><strong class="team-name">Team</strong>'s Todo List</span>
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

export default function Kanban({ id }) {
  const dom = createElement(template);
  const teamName = dom.querySelector(".team-name");
  const todoContainer = dom.querySelector(".todoapp-list-container");
  const memberCreateBtn = dom.querySelector(".add-user-button-container");

  const init = async () => {
    await render();
  };

  const render = async () => {
    const { name, members } = await $api.team.getById(id);

    teamName.innerText = name;
    todoContainer.innerHTML = "";
    members.forEach(renderEachMember);
    todoContainer.appendChild(memberCreateBtn);
  };

  const renderEachMember = (member) => {
    const todoListContainer = TodoContainer({ member });
    todoContainer.appendChild(todoListContainer);
  };

  init();

  return dom;
}
