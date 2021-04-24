const makeAddTeamButton = `
  <div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
    </button>
  </div>
`;

const makeAddUserButton = `
	<li class="add-user-button-container">
	<button id="add-user-button" class="ripple">
		<span class="material-icons">add</span>
	</button>
	</li>
`;

const makeTeamCardContainer = function (item) {
  return `
					<div class="team-card-container">
						<a id="${item._id}" href="/kanban.html" class="card">
							<div class="card-title">
									${item.name}
							</div>
						</a>
					</div>
	`;
};

const todoListItemTemplate = function (todoListItem) {
  // TODO: chip 순위 설정
  return `
					<li class="todo-list-item" id="${todoListItem._id}">
					<div class="view">
						<input class="toggle" type="checkbox" />
						<label class="label">
							<div class="chip-container">
								<!-- <span class="chip secondary">1순위</span> -->
								<select class="chip select">
									<option value="0" selected>순위</option>
									<option value="1">1순위</option>
									<option value="2">2순위</option>
								</select>
							</div>
							${todoListItem.contents}
							</label>
							<button class="destroy"></button>
							</div>
							<input class="edit" value="완료된 타이틀" />
							</li>
		`;
};

const todoAppContainer = function (member) {
  let appContainer = '';

  member.todoList.forEach(element => {
    appContainer += todoListItemTemplate(element);
  });
  return `
	<li class="todoapp-container" data-member-id=${member._id}>
  <h2>
    <span><strong>${member.name}</strong>'s Todo List</span>
  </h2>
  <div class="todoapp">
    <section class="input-container">
      <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
    </section>
    <section class="main">
      <ul class="todo-list">
			${appContainer}
        </li>
      </ul>
    </section>
    <div class="count-container">
      <span class="todo-count">총 <strong>${member.todoList.length}</strong> 개</span>
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
};

export {
  makeAddTeamButton,
  makeAddUserButton,
  makeTeamCardContainer,
  todoAppContainer,
  todoListItemTemplate,
};
