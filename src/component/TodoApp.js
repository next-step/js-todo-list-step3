import TodoInput from "./TodoInput.js";
import TodoItemModel from "./model/TodoItemModel.js";
import Member from "./model/Member.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoMode from "./TodoMode.js";
import TodoAllClear from "./TodoAllClear.js";
import TodoTitle from "./TodoTitle.js";

import KEY_CODE from "../constants/KeyCode.js";
import env from "../constants/env.js";

import request from "../util/request.js";

import onChangeMode from "./events/TodoMode.js";
import onAdd from "./events/TodoInput.js";
import { onDelete, onCompleted, onEditing } from "./events/TodoList.js";
import onAllClear from "./events/TodoAllClear.js";

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
	// const countTarget = document.querySelector(".todo-count strong");
	// const todoCount = new TodoCount({ target: countTarget });

	// const listTarget = document.querySelector(".todo-list");
	// const todoList = new TodoList({
	// 	target: listTarget,
	// 	status: null,
	// 	onDeleteButton: onDelete.bind(this),
	// 	onCompleted: onCompleted.bind(this),
	// 	onEditing: onEditing.bind(this),
	// 	onSettingPriority: (id) => async (event) => {
	// 		if (event.target.value !== 0) {
	// 			const priority = event.target.value === "1" ? "FIRST" : "SECOND";

	// 			const { response, error } = await request(
	// 				env.BASE_URL + env.ITEM_PRIORITY(this.users[this.selectedUserIdx].id, id),
	// 				"PUT",
	// 				{ priority }
	// 			);
	// 			if (error) {
	// 				alert("할 일 완료에 실패했습니다.");
	// 				return;
	// 			}

	// 			this.users[this.selectedUserIdx].todoList.map((item) => {
	// 				if (item.id === id) {
	// 					item.priority = priority;
	// 				}
	// 				return item;
	// 			});
	// 			this.setTodoItems(this.users[this.selectedUserIdx].todoList);
	// 		}
	// 	},
	// 	onEdit: (id) => async (event) => {
	// 		if (event.keyCode === KEY_CODE.ESC) {
	// 			this.users[this.selectedUserIdx].todoList.map((item) => {
	// 				if (item.id === id) {
	// 					item.editing = false;
	// 				}
	// 				return item;
	// 			});
	// 			this.setTodoItems(this.users[this.selectedUserIdx].todoList);
	// 		} else if (event.keyCode === KEY_CODE.ENTER) {
	// 			const { response, error } = await request(
	// 				env.BASE_URL + env.USER_ITEM(this.users[this.selectedUserIdx].id, id),
	// 				"PUT",
	// 				{ contents: event.target.value }
	// 			);
	// 			if (error) {
	// 				alert("할 일 완료에 실패했습니다.");
	// 				return;
	// 			}

	// 			this.users[this.selectedUserIdx].todoList.map((item) => {
	// 				if (item.id === id) {
	// 					item.contents = event.target.value;
	// 					item.editing = false;
	// 				}
	// 				return item;
	// 			});
	// 			this.setTodoItems(this.users[this.selectedUserIdx].todoList);
	// 		}
	// 	}
	// });

	// new TodoInput({
	// 	onAdd: onAdd.bind(this)
	// });

	// new TodoMode({
	// 	target: document.querySelector(".filters"),
	// 	onChangeMode: onChangeMode.bind(this)
	// });

	// new TodoAllClear({
	// 	target: document.querySelector(".clear-completed"),
	// 	onAllClear: onAllClear.bind(this)
	// });

	const todoTitle = new TodoTitle(document.querySelector("#user-title strong"));

	this.render = () => {
		// 	userList.render(this.users, 0);

		// 	this.setTodoItems(this.users[0].todoList);
		todoTitle.setState(this.listName);
		this.memberList.setState(this.members);
		// 	todoCount.setState(this.users[0].todoList);
	};

	// this.setTodoItems = (updatedTodo) => {
	// 	todoList.setState(updatedTodo);
	// 	todoCount.setState(updatedTodo);
	// };

	// this.setUsers = (updatedUsers) => {
	// 	this.users = updatedUsers;
	// 	userList.render(this.users, this.selectedUserIdx);

	// 	todoTitle.setState(this.users[this.selectedUserIdx].name);
	// 	todoCount.setState(this.users[this.selectedUserIdx].todoList);
	// };

	// this.setSelectedUser = (selectedUserIdx) => {
	// 	this.selectedUserIdx = selectedUserIdx;
	// 	userList.setState(this.users, this.selectedUserIdx);

	// 	todoList.setState(this.users[this.selectedUserIdx].todoList);
	// 	todoCount.setState(this.users[this.selectedUserIdx].todoList);
	// };

	this.render();
}

export default TodoApp;
