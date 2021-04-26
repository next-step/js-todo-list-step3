import TodoItemModel from "./model/TodoItemModel.js";
import Member from "./model/Member.js";
import TodoTitle from "./TodoTitle.js";

import MemberList from "./MemberList.js";

function TodoApp({ members, id, name }) {
	this.listId = id;
	this.listName = name;

	this.members = members.map(
		(member) =>
			new Member({
				id: member._id,
				name: member.name,
				todoList: member.todoList.map(
					(todo) =>
						new TodoItemModel({
							...todo,
							id: todo._id
						})
				)
			})
	);

	const $memberListContainer = document.querySelector(".todoapp-list-container");
	this.memberList = new MemberList({
		target: $memberListContainer,
		members: this.members
	});

	const todoTitle = new TodoTitle(document.querySelector("#user-title strong"));

	this.render = () => {
		todoTitle.setState(this.listName);
		this.memberList.setState(this.members);
	};

	this.render();
}

export default TodoApp;
