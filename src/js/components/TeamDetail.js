import Api from "../api/api.js";
import {$, $$} from "../utils/querySelector.js";

export default function teamDetail() {
  this.teamId = "";

  const setMemberList = async () => {
    addMembers(await getTeamMembers());
  }

  const getTeamMembers = async () => {
    const params = new URLSearchParams(window.location.search);
    this.teamId = params.get("id");
    const data = await Api.getFetch(`/api/teams/${this.teamId}`);

    $("#user-title").querySelector("strong").innerHTML = data.name;

    return data.members;
  };

  const addEvent = () => {
    const $listContainer = $(".todoapp-list-container");

    $listContainer.addEventListener('click', ({target, target: {value, classList}}) => {

      if (classList.contains('destroy')) deleteItem(target)
      else if (classList.contains('toggle')) completeItem(target)
      else if (classList.contains('clear-completed')) deleteAll(target)
      else if (classList.contains('filter')) filterList(target)
    });

    $listContainer.addEventListener('change', ({target, target: {value, classList}}) => {
      if (classList.contains('chip')) changePriority(target, value);
    });

    $listContainer.addEventListener('dblclick', ({target, target: {value, classList}}) => {
      if (classList.contains('label')) editItem(target);
    });

    $listContainer.addEventListener('keyup', ({target, target: {value, classList}, key}) => {
      key === "Enter" && addTodo(target);
    });

    $('#add-user-button').addEventListener('click', async () => {
      const result = prompt('새로운 팀원 이름을 입력해주세요');

      await Api.postFetch(`/api/teams/${this.teamId}/members`, {name: result});
      await setMemberList();
    });
  };

  const addTodo = async ($newTodo) => {
    const content = $newTodo.value;
    const memberId = $newTodo.closest(".todoapp-container").dataset.memberId;

    if (content.length < 2) return alert(Message.SHORT_INPUT_LENGTH);

    await Api.postFetch(`/api/teams/${this.teamId}/members/${memberId}/items/`, {contents: content});
    setMemberList();

    $newTodo.value = "";
  }

  const addMembers = (members) => {
    const $todoappListContainer = $(".todoapp-list-container");
    const $addUserButtonContainer = $(".add-user-button-container").outerHTML;
    let memberItems = "";

    $todoappListContainer.innerHTML = "";

    members.map(({_id, name, todoList}) => {
      let todos = "";
      todoList.map(todoItem => todos += $new(todoItem));

      memberItems += `
				<li class="todoapp-container" data-member-id="${_id}">
					<h2><span><strong>${name}</strong>'s Todo List</span></h2>
					<div class="todoapp">
						<section class="input-container">
							<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
						</section>
						<section class="main">
							<ul class="todo-list">
							${todos}
							</ul>
						</section>
						<div class="count-container">
							<span class="todo-count">총 <strong>${todoList.length}</strong> 개</span>
							<ul class="filters">
								<li><a class="filter selected" href="#all" data-filter="ALL">전체보기</a></li>
								<li><a class="filter" href="#priority" data-filter="PRIORITY">우선 순위</a></li>
								<li><a class="filter" href="#active" data-filter="ACTIVE">해야할 일</a></li>
								<li><a class="filter" href="#completed" data-filter="COMPLETED">완료한 일</a></li>
							</ul>
							<button class="clear-completed">모두 삭제</button>
						</div>
					</div>
				</li>`;
    })

    memberItems += $addUserButtonContainer;
    $todoappListContainer.innerHTML = memberItems;

    addEvent();
  };

  const $new = ({_id, contents, isCompleted, priority}) => {
    return `
			<li class="todo-list-item ${isCompleted && "completed"}" data-id="${_id}">
				<div class="view">
					<input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
					<label class="label">
							<div class="chip-container">${setPriority(priority)}</div>
							${contents}
					</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" value="${contents}" />
			</li>`;
  };


  const setPriority = (priority) => {
    const className = (priority === "FIRST" && "primary") || (priority === "SECOND" && "secondary");

    const item = `
			<select class="chip select ${className}">
				<option value="0" ${priority === "NONE" && "selected"}>순위</option>
				<option value="1" ${priority === "FIRST" && "selected"}>1순위</option>
				<option value="2" ${priority === "SECOND" && "selected"}>2순위</option>
			</select>`

    return item;
  }


  const changePriority = async ($chipSelect, value) => {
    const memberId = $chipSelect.closest(".todoapp-container").dataset.memberId;
    const itemId = $chipSelect.closest(".todo-list-item").dataset.id;
    let priority = "";

    if (value === "1") priority = "FIRST";
    else if (value === "2") priority = "SECOND";
    else priority = "NONE";

    await Api.putFetch(`/api/teams/${this.teamId}/members/${memberId}/items/${itemId}/priority`, {priority: priority});
    setMemberList();
  }


  const editItem = ($label) => {
    const $parentLi = $label.closest(".todo-list-item");
    const $edit = $parentLi.querySelector(".edit");

    $$(".todo-list li").forEach(li => li.classList.remove("editing"));
    $parentLi.classList.add("editing");

    $edit.addEventListener("keyup", ({key, currentTarget}) => key === "Enter" && saveEditItem(currentTarget))
  }

  const saveEditItem = async ($edit) => {
    const memberId = $edit.closest(".todoapp-container").dataset.memberId;
    const itemId = $edit.closest(".todo-list-item").dataset.id;

    await Api.putFetch(`/api/teams/${this.teamId}/members/${memberId}/items/${itemId}`, {contents: $edit.value});
    setMemberList();
  }


  const deleteItem = async ($delete) => {
    const itemId = $delete.closest(".todo-list-item").dataset.id;
    const memberId = $delete.closest(".todoapp-container").dataset.memberId;

    await Api.deleteFetch(`/api/teams/${this.teamId}/members/${memberId}/items/${itemId}`);
    setMemberList();
  }


  const completeItem = ($toggle) => {
    const $parentLi = $toggle.closest(".todo-list-item");
    const itemId = $parentLi.dataset.id;
    const chrBool = $toggle.checked;
    const memberId = $toggle.closest(".todoapp-container").dataset.memberId;

    $parentLi.classList.remove(chrBool ? "new" : "completed");
    $parentLi.classList.add(chrBool ? "completed" : "new");

    Api.putFetch(`/api/teams/${this.teamId}/members/${memberId}/items/${itemId}/toggle`);
  }

  const deleteAll = async ($deleteAll) => {
    const memberId = $deleteAll.closest(".todoapp-container").dataset.memberId;

    await Api.deleteFetch(`/api/teams/${this.teamId}/members/${memberId}/items/`);
    setMemberList();
  }


  const filterList = async ($filter) => {
		const filterType = $filter.dataset.filter;
    const memberId = $filter.closest(".todoapp-container").dataset.memberId;
    const $targetMemberContainer = $(`.todoapp-container[data-member-id="${memberId}"]`);
    const memberInfo = await Api.getFetch(`/api/teams/${this.teamId}/members/${memberId}`);
    let todoList = memberInfo.todoList;
		let todoItems = "";

		if (filterType !== "ALL") {
    	if (filterType === "PRIORITY") {
				let sortArr = [];
				let sortArr2 = [];

				sortArr = (todoList.filter(({priority}) => priority === "FIRST"));
				sortArr2 = sortArr.concat(todoList.filter(({priority}) => priority === "SECOND" ));
				sortArr = sortArr2.concat(todoList.filter(({priority}) => priority === "NONE" ));

				todoList = sortArr;
			}
			else todoList = todoList.filter(({isCompleted}) => isCompleted === (filterType === "COMPLETED"));
		}

		todoList.map(todoItem => todoItems += $new(todoItem));

		$targetMemberContainer.querySelector(".todo-list").innerHTML = todoItems;
  }


  this.init = () => {
    setMemberList();
  }
}