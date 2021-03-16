import { TodoApp } from "/js/components/index.js";

const renderMemberItem = ({ name }) => `
    <li class="todoapp-container">
        <h2>
            <span><strong>${name}</strong>'s Todo List</span>
        </h2> 
        <div class="todoapp">
          <section class="input-container">
            <input class="new-todo" placeholder="할 일을 입력해주세요."/>
          </section>
          <section class="main">
            <ul class="todo-list">
              <li>
                <div class="view">
                  <label class="label">
                    <div class="animated-background">
                      <div class="skel-mask-container">
                        <div class="skel-mask"></div>
                      </div>
                    </div>
                  </label>
                </div>
              </li>
            </ul>
          </section>
          <div class="count-container">
            <span class="todo-count">총 <strong>0</strong> 개</span>
            <ul class="filters">
              <li>
                <a href="/#" class="all selected" >전체보기</a>
              </li>
              <li>
                <a href="#active" class="active">해야할 일</a>
              </li>
              <li>
                <a href="#completed" class="completed">완료한 일</a>
              </li>
            </ul>
            <button class="clear-completed">모두 삭제</button>
          </div>
        </div>
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

    const { teamId } = memberApp;
    const todoAppEls = listEl.querySelectorAll(".todoapp");
    memberApp.members.forEach(
      (user, i) => new TodoApp(todoAppEls[i], { teamId, user })
    );
  };

  listEl.addEventListener("click", this.addMember);
}
