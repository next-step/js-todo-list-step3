import TodoList from "./TodoList.js";
import template from "../util/template.js";
import Member from "./model/Member.js";

import TodoCount from "./TodoCount.js";
import TodoMode from "./TodoMode.js";
import TodoInput from "./TodoInput.js";
import TodoAllClear from "./TodoAllClear.js";

import onAllClear from "./events/TodoAllClear.js";
import onAdd from "./events/TodoInput.js";
import { onDelete, onEditing, onCompleted, onEdit, onSettingPriority } from "./events/TodoList.js";
import onChangeMode from "./events/TodoMode.js";

function MemberList({ target, members }) {
	this.setState = (updatedMembers) => {
		this.render(updatedMembers);
	};

	this.members = members;

	this.setMembers = (updatedMembers) => {
		this.members = updatedMembers;
		this.render(this.members);
	};

	const setMemberTodoList = (idx) => (todoList) => {
		this.members[idx].todoList = todoList;
	};

	const html = (member, idx) => {
		const container = template("li", { class: "todoapp-container" });

		const nameContainer = template("h2");
		const span = template("span");
		const name = template("strong", { text: member.name });
		span.append(name, document.createTextNode("'s Todo List"));
		nameContainer.append(span);

		const todoApp = template("div", { class: "todoapp" });

		const inputSection = template("section", { class: "input-container" });
		const input = template("input", { class: "new-todo", placeholder: "할 일을 입력해주세요.", autofocus: true });
		inputSection.append(input);

		const mainSection = template("section", { class: "main" });
		const ul = template("ul", { class: "todo-list" });
		// 여기서 todo List를 돌린다
		const todoList = new TodoList({
			todoList: member.todoList,
			setMemberTodoList: setMemberTodoList(idx),
			target: ul
		});
		todoList.attachEvent({
			onDeleteButton: onDelete.bind(todoList),
			onEditing: onEditing.bind(todoList),
			onCompleted: onCompleted.bind(todoList),
			onEdit: onEdit.bind(todoList),
			onSettingPriority: onSettingPriority.bind(todoList)
		});
		todoList.setState(member.todoList);
		new TodoInput({ target: input, onAdd: onAdd.bind(todoList) });

		mainSection.append(ul);

		const counterContainer = template("div", { class: "count-container" });
		const todoCount = template("span", { class: "todo-count" });
		const $countTarget = template("strong", { text: 0 });
		todoCount.append(document.createTextNode("총"), $countTarget, document.createTextNode("개"));
		new TodoCount({ target: $countTarget });

		const filters = template("ul", { class: "filters" });
		const seeAllContainer = template("li");
		const seeAllLink = template("a", { href: "#all", class: "all selected", text: "전체보기" });
		const priorityContainer = template("li");
		const priorityLink = template("a", { href: "#priority", class: "priority", text: "우선 순위" });
		const todoContainer = template("li");
		const todoLink = template("a", { href: "#active", class: "todo", text: "해야할 일" });
		const completedContainer = template("li");
		const completedLink = template("a", { href: "#completed", class: "completed", text: "완료한 일" });
		seeAllContainer.append(seeAllLink);
		priorityContainer.append(priorityLink);
		todoContainer.append(todoLink);
		completedContainer.append(completedLink);
		new TodoMode({
			target: filters,
			onChangeMode: onChangeMode.bind(todoList)
		});

		filters.append(seeAllContainer, priorityContainer, todoContainer, completedContainer);

		const button = template("button", { class: "clear-completed", text: "모두 삭제" });
		new TodoAllClear({
			target: button,
			onAllClear: onAllClear.bind(todoList)
		});
		counterContainer.append(todoCount, filters, button);

		todoApp.append(inputSection, mainSection, counterContainer);
		container.append(nameContainer, todoApp);

		return container;
	};

	const onClick = () => {
		const name = prompt("이름을 입력해주세요");

		this.setMembers([
			...this.members,
			new Member({
				id: "12",
				name
			})
		]);
	};

	this.render = (updatedMembers) => {
		target.innerHTML = "";
		const doms = updatedMembers.map((member, idx) => html(member, idx));
		const addUserButtonContainer = template("li", { class: "add-user-button-container" });
		const addUserButton = template("button", { id: "add-user-button", class: "ripple", onClick });
		const addUserButtonSpan = template("span", { class: "material-icons", text: "add" });

		addUserButton.append(addUserButtonSpan);
		addUserButtonContainer.append(addUserButton);

		target.append(...doms, addUserButtonContainer);
	};
}

export default MemberList;
