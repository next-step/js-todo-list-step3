import { kanbanAPI } from "./API.js";
import { $, $all } from "./Dom.js";
import { getMemberInfo } from "./MemberInfo.js";
import { template } from "./Template.js";

const teamId = new URLSearchParams(document.location.search).get("id");

const PENDING = "false";
const COMPLETED = "completed";

const $todoInput = (memberId) => {
	return $(`li[data-memberId="${memberId}"] .new-todo`);
};
const $todoList = (memberId) => {
	return $(`li[data-memberId="${memberId}"] .todo-list`);
};
const $todoCount = (memberId) => {
	return $(`li[data-memberId="${memberId}"] .todo-count strong`);
};

const showAllBtn = $(".all");
const completedBtn = $(".completed");
const pendingBtn = $(".active");
const deleteAllBtn = $(".clear-completed");

// const priorityList = {
// 	NONE: "select",
// 	FIRST: "primary",
// 	SECOND: "secondary",
// };

function memberInfo(memberId) {
	return getMemberInfo().filter(
		(memberInfo) => memberInfo.memberId === memberId
	)[0];
}

function findMemberId(target) {
	return target.closest(".todoapp-container").dataset.memberid;
}

// 할 일들의 개수
function setTodoNum(memberId) {
	const todoNum = $todoList(memberId).children.length;
	$todoCount(memberId).textContent = todoNum;
}

// 완료 여부 확인
function isComplete(toggle) {
	if (!toggle.checked) {
		return false;
	}
	return true;
}

// todoItem 이벤트
function itemEventTrigger(memberId) {
	const todoList = $todoList(memberId);
	todoList.addEventListener("click", removeItem);
	todoList.addEventListener("click", setItemState);
	todoList.addEventListener("dblclick", editItem);
	todoList.addEventListener("keyup", finishEdit);
	// todoList.addEventListener("change", selectPriority);
}

// 리스트 랜더링
export function renderTodoItem(memberId, todoItems) {
	const mergedTemplate = todoItems.map((item) => {
		return template.todoItemTemplate(
			item._id,
			item.contents,
			item.isCompleted,
			item.priority
		);
	});
	$todoList(memberId).insertAdjacentHTML(
		"afterbegin",
		mergedTemplate.join("")
	);
	itemEventTrigger(memberId);
	setTodoNum(memberId);
}

// toDoList 업데이트
function updateTodoItem(memberId, _id, contents, isCompleted, priority) {
	const todoItemInfo = {
		_id,
		contents,
		isCompleted,
		priority,
	};
	memberInfo(memberId).todoList.push(todoItemInfo);
	renderTodoItem(memberId, memberInfo(memberId).todoList);
}

// 할 일 입력
async function enterItem(event) {
	if (!event.isComposing && event.key === "Enter") {
		const memberId = findMemberId(event.target);
		const inputText = $todoInput(memberId).value;
		if (inputText.length < 2) {
			alert("두 글자 이상으로 적어주세요!");
		} else {
			const todoInput = $todoInput(memberId);
			const addedItem = await kanbanAPI.fetchAddTodo(
				teamId,
				memberId,
				inputText
			);
			updateTodoItem(
				memberId,
				addedItem._id,
				addedItem.contents,
				addedItem.completed,
				addedItem.priority
			);
			todoInput.value = "";
		}
	}
}

// 할 일 상태 설정
async function setItemState(event) {
	if (event.target.classList.contains("toggle")) {
		const toggle = event.target;
		const memberId = findMemberId(toggle);
		toggle.toggleAttribute("checked");
		const $todoItem = toggle.closest("li");
		$todoItem.className = isComplete(toggle) ? COMPLETED : PENDING;
		const idx = memberInfo(memberId).todoList.findIndex(
			(item) => item._id === $todoItem.id
		);
		memberInfo(memberId).todoList[idx].isCompleted = isComplete(toggle)
			? true
			: false;
		await kanbanAPI.fetchTodoToggle(teamId, memberId, $todoItem.id);
	}
}

// 할 일 삭제
async function removeItem(event) {
	if (event.target.className === "destroy") {
		const destroy = event.target;
		const memberId = findMemberId(destroy);
		const $todoItem = destroy.closest("li");
		$todoList(memberId).removeChild($todoItem);
		await kanbanAPI.fetchDeleteTodo(teamId, memberId, $todoItem.id);
		memberInfo(memberId).todoList = memberInfo(memberId).todoList.filter(
			(item) => item._id !== $todoItem.id
		);
		setTodoNum(memberId);
	}
}

// 할 일 수정
function editItem(event) {
	if (event.target.className === "label") {
		const label = event.target;
		const $todoItem = label.closest("li");
		$todoItem.classList.add("editing");
	}
}

// 수정 종료
async function finishEdit(event) {
	const $todoItem = event.target.closest("li");
	if ($todoItem.classList.contains("editing")) {
		const edit = event.target;
		const memberId = findMemberId(edit);
		const $label = $todoItem.querySelector("label span");
		const editText = edit.value;

		if (event.key === "Escape") {
			$todoItem.classList.remove("editing");
			edit.value = $label.textContent;
		}

		if (event.key === "Enter") {
			$todoItem.classList.remove("editing");
			edit.setAttribute("value", editText);
			$label.textContent = editText;
			const idx = memberInfo(memberId).todoList.findIndex(
				(item) => item._id === $todoItem.id
			);
			memberInfo(memberId).todoList[idx].contents = editText;
			await kanbanAPI.fetchEditTodo(
				teamId,
				memberId,
				$todoItem.id,
				editText
			);
		}
	}
}

// // 우선 순위 정하기
// async function selectPriority(event) {
// 	const $todoItem = event.target.closest("li");
// 	const $user = $(".active");
// 	if (event.target.classList.contains("chip")) {
// 		const select = event.target;
// 		const result = select.value;
// 		Object.keys(priorityList).map((priority) => {
// 			if (result === priority) {
// 				select.classList.remove("select", "primary", "secondary");
// 				select.classList.add(priorityList[result]);
// 			}
// 		});
// 		await todoAPI.fetchPriority($user.dataset.id, $todoItem.id, result);
// 		const idx = todoItemList.findIndex((item) => item._id === $todoItem.id);
// 		todoItemList[idx].priority = result;
// 	}
// }

// // 상태별 보기 버튼 설정
// function showProgress(event) {
// 	const completedList = todoItemList.filter(
// 		(item) => item.isCompleted === true
// 	);
// 	const pendingList = todoItemList.filter(
// 		(item) => item.isCompleted === false
// 	);
// 	if (event.target === showAllBtn) {
// 		renderTodoItem(todoItemList);
// 	}
// 	if (event.target === completedBtn) {
// 		renderTodoItem(completedList);
// 	}
// 	if (event.target === pendingBtn) {
// 		renderTodoItem(pendingList);
// 	}
// 	setTodoNum();
// }

// // 전체 삭제
// async function removeAllItems(event) {
// 	const $user = $(".active");
// 	$todoList.innerHTML = "";
// 	setTodoNum();
// 	await todoAPI.fetchDeleteAll($user.dataset.id);
// 	todoItemList = [];
// 	saveUserTodoList(todoItemList);
// }

export function todoRole() {
	const todoInputs = $all(".new-todo");
	todoInputs.forEach((todoInput) =>
		todoInput.addEventListener("keydown", enterItem)
	);
	// showAllBtn.addEventListener("click", showProgress);
	// completedBtn.addEventListener("click", showProgress);
	// pendingBtn.addEventListener("click", showProgress);
	// deleteAllBtn.addEventListener("click", removeAllItems);
}
