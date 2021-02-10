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
  this.addMember = ({ target }) => {
    if (!target.closest("#add-user-button")) {
      return;
    }

    const name = prompt("추가하고 싶은 이름을 입력해주세요.").trim();
    if (name.length < 2) {
      alert("이름은 최소 2글자 이상이어야 합니다.");
      return;
    }

    memberApp.addMember(name);
  };

  this.render = () => {
    listEl.innerHTML = `
      ${memberApp.members.map(renderMemberItem).join("")}
      ${renderAddButton()}
    `;

    const todoAppEls = listEl.querySelectorAll(".todoapp");
    memberApp.members.forEach(
      (member, i) => new TodoApp(todoAppEls[i], member)
    );
  };

  listEl.addEventListener("click", this.addMember);
}
