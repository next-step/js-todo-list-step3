import { TodoApp } from "/js/components/index.js";

const renderMemberItem = ({ name }) => `
    <li class="todoapp-container">
        <h2>
            <span><strong>${name}</strong>'s Todo List</span>
        </h2> 
        <div class="todoapp"></div>
    </li>
`;

const renderAddButton = () => `
    <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
        </button>
    </li>
`;

export default function MemberList(listEl, memberApp) {
  this.render = () => {
    listEl.innerHTML = `${memberApp.members
      .map(renderMemberItem)
      .join("")}${renderAddButton()}`;

    const todoAppEls = listEl.querySelectorAll(".todoapp");
    memberApp.members.forEach(
      (member, i) => new TodoApp(todoAppEls[i], member)
    );
  };
}
