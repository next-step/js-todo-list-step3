const priortyTemplate = {
	NONE: `
	<select class="chip select">
		<option value="NONE" selected="">순위</option>
		<option value="FIRST">1순위</option>
		<option value="SECOND">2순위</option>
  	</select>
`,
	FIRST: `
	<select class="chip primary">
		<option value="NONE">순위</option>
		<option value="FIRST" selected="">1순위</option>
		<option value="SECOND">2순위</option>
  	</select>
`,
	SECOND: `
	<select class="chip secondary">
		<option value="NONE">순위</option>
		<option value="FIRST">1순위</option>
		<option value="SECOND" selected="">2순위</option>
  	</select>
`,
};

export const template = {
	teamAddTemplate: (teamId, teamName) =>
		`
    <div class="team-card-container">
        <a href="/kanban.html?id=${teamId}" class="card">
            <div class="card-title">${teamName}</div>
        </a>
    </div>
    `,
	kanbanAddTemplate: (memberName) =>
		`
    <li class="todoapp-container" data-member=${memberName}>
		<h2>
			<span><strong>${memberName}</strong>'s Todo List</span>
		</h2>
		<div class="todoapp">
			<section class="input-container">
				<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus="">
			</section>
			<section class="main">
				<ul class="todo-list"></ul>
			</section>
			<div class="count-container">
				<span class="todo-count">총 <strong>0</strong> 개</span>
				<ul class="filters">
					<li>
						<a href="#all" class="all selected">전체보기</a>
					</li>
					<li>
						<a href="#priority" class="priority">우선 순위</a>
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
    `,
	teamNameTemplate: (teamName) =>
		`<span><strong>${teamName}</strong>'s Todo List</span>`,
	todoItemTemplate: (id, inputText, completed, priority) =>
		`<li id=${id} class=${completed ? "completed" : "false"}>
			<div class="view">
				<input class="toggle" type="checkbox" id=${id} ${completed ? "checked" : ""}>
				<label class="label">
					<div class="chip-container">
						${priortyTemplate[priority]}
					</div>
					${inputText}
				</label>
			<button class="destroy" id=${id}></button>
			</div>
			<input class="edit" value=${inputText}>
		</li>
		`,
};
