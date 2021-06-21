import { $, $$, METHOD, API, baseUrl } from './util.js';
import { loadToDoItems, toDoRender } from './todo.js';

const $todoApps = $('.todoapp-list-container');
const urlParams = new URLSearchParams(location.search);
const teamId = urlParams.get('id');

function App() {
  $todoApps.addEventListener('click', ({ target }) => {
    if (target.classList.contains('chip')) {
      const $chipSelect = target.closest('.chip-container').querySelector('select');
      target.classList.add('hidden');
      $chipSelect.classList.remove('hidden');
    }
  })

  const addMemberBtn =
    `
    <li class="add-user-button-container">
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    </li>
    `;

  const userTemplate = user => {
    const template = user.members.map(member => {
      return (
        `
        <li class="todoapp-container" data-member-id="${member._id}">
          <h2>
            <span><strong>${member.name}</strong>'s Todo List</span>
          </h2>
          <div class="todoapp">
            <section class="input-container">
              <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
            </section>
            <section class="main">
              <ul class="todo-list"></ul>
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
        </li>
        `
      );
    });
    return template;
  }

  const renderMembers = user => {
    const $userTitle = $('#user-title')
    $userTitle.dataset.username = user.name;
    $userTitle.querySelector('strong').innerText = user.name;

    const memberList = userTemplate(user);
    $todoApps.innerHTML = memberList.join('') + addMemberBtn;

    const $addUserButton = $('#add-user-button')
    $addUserButton.addEventListener('click', () => {
      const result = prompt('새로운 팀원 이름을 입력해주세요');
      if (result) addUser(result, API, METHOD);
    })

    user.members.map(member => {
      loadToDoItems(teamId, member._id, API);
    });

  };

  const loadUser = async ({ TEAM }) => {
    const users = await fetch(TEAM(teamId))
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .catch(error => console.log(error))

    renderMembers(users);
  }

  const addUser = async (name, { MEMBERS }, { POST }) => {
    fetch(MEMBERS(teamId), {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })

    loadUser(API);
  };


  loadUser(API);
};

new App();
