import {$} from "./utils/querySelector.js"
import Api from "../js/api/api.js";

function App() {
  let params = new URLSearchParams(window.location.search);
  this.teamId = params.get("id");

  const init = () => {
    getTeamMembers();
  }

  const getTeamMembers = async () => {
    let members = (await Api.getFetch(`/api/teams/${this.teamId}`)).members;
    console.log(members);
    setMemberList(members);
  }

  init();

  $(".todoapp-list-container").addEventListener('click', ({target, target:{classList}}) => {
    console.log(">>> ", window.location.search)
    if (classList.contains('chip')) {

      const $chipSelect = target.closest('.chip-container').querySelector('select')

      classList.add('hidden')
      $chipSelect.classList.remove('hidden')
    }
  })

  $('#add-user-button').addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요')
  });


  const setMemberList = (members) => {
    const $todoappListContainer = $(".todoapp-list-container");
    let memberItems = "";

    $todoappListContainer.innerHTML = "";

    members.map(({ name, todoList }) => {
      let todos = "";
      todoList.map(todoItem => todos += $new(todoItem));

      memberItems += `
        <li class="todoapp-container">
          <h2>
            <span><strong>${ name }</strong>'s Todo List</span>
          </h2>
          <div class="todoapp">
            <section class="input-container">
              <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
            </section>
            <section class="main">
              <ul class="todo-list">
              ${todos}
              <!--
                <li class="todo-list-item">
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <select class="chip select">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      해야할 아이템
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
                </li>
                <li class="todo-list-item">
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <select class="chip select">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      해야할 아이템
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
                </li>
                <li class="todo-list-item">
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <span class="chip primary">1순위</span>
                        <select class="chip select hidden">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      <span class="todo-item-text">해야할 아이템</span>
                    </label>
                    <button class="delete"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
                </li>
                <li class="todo-list-item">
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <span class="chip secondary">1순위</span>
                        <select class="chip select hidden">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      해야할 아이템
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
                </li>
                <li class="todo-list-item completed">
                  <div class="view">
                    <input class="toggle" type="checkbox" checked />
                    <label class="label">
                      <div class="chip-container">
                        <span class="chip primary">1순위</span>
                        <select class="chip select hidden">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      완료된 아이템
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="완료된 타이틀" />
                </li>
                <li class="todo-list-item editing">
                  <div class="view">
                    <input class="toggle" type="checkbox" checked />
                    <label class="label">
                      <div class="chip-container">
                        <span class="chip primary">1순위</span>
                        <select class="chip select hidden">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>
                      </div>
                      수정중인 아이템
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="수정중인 타이틀" />
                </li>
             -->
              </ul>
            </section>
            <div class="count-container">
              <span class="todo-count">총 <strong>0</strong> 개</span>
              <ul class="filters">
                <li>
                  <a href="#all" class="selected">전체보기</a>
                </li>
                <li>
                  <a href="#priority">우선 순위</a>
                </li>
                <li>
                  <a href="#active">해야할 일</a>
                </li>
                <li>
                  <a href="#completed">완료한 일</a>
                </li>
              </ul>
              <button class="clear-completed">모두 삭제</button>
            </div>
          </div>
        </li>`;
    })

    $todoappListContainer.innerHTML = memberItems;
  }

  const $new = ({ _id, contents, isCompleted, priority }) => {
    return `
      <li class="${ isCompleted && "completed" }" data-id="${ _id }">
        <div class="view">
            <input class="toggle" type="checkbox" data-id="${ _id }" ${ isCompleted && "checked" }/>
            <label class="label">
                <div class="chip-container">${ setPriority(priority) }</div>
                ${ contents }
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${ contents }" />
      </li>`;
  };


  const setPriority = (priority) => {
    let item = "";
    if (priority === "NONE")
      item = `<select class="chip select">
						<option value="0" selected>순위</option>
						<option value="1">1순위</option>
						<option value="2">2순위</option>
					</select>`
    else if (priority === "FIRST") item = `<span class="chip primary">1순위</span>`
    else if (priority === "SECOND") item = `<span class="chip secondary">2순위</span>`

    return item;
  }


}



new App()
