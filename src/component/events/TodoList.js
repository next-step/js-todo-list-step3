import TodoItemModel from "../model/TodoItemModel.js";

import request from "../../util/request.js";

import KEY_CODE from "../../constants/KeyCode.js";
import env from "../../constants/env.js";

export async function onDelete(id) {
	// const { response, error } = await request(
	// 	env.BASE_URL + env.USER_ITEM(this.users[this.selectedUserIdx].id, id),
	// 	"DELETE"
	// );
	// if (error) {
	// 	alert("할 일 삭제에 실패했습니다.");
	// 	return;
	// }
	const updatedTodoList = this.todoList.filter((item) => item.id !== id);

	this.setState(updatedTodoList);
}

export async function onCompleted(id) {
	// const { response, error } = await request(
	// 	env.BASE_URL + env.ITEM_TOGGLE(this.users[this.selectedUserIdx].id, id),
	// 	"PUT"
	// );
	// if (error) {
	// 	alert("할 일 완료에 실패했습니다.");
	// 	return;
	// }

	const updatedTodoList = this.todoList.map((item) => {
		if (item.id === id) {
			return new TodoItemModel({ ...response, id: response._id });
		}
		return item;
	});

	this.setState(updatedTodoList);
}

export function onEditing(id) {
	const updatedTodoList = this.todoList.map((item) => {
		if (item.id === id) {
			item.editing = true;
		}
		return item;
	});

	this.setState(updatedTodoList);
}

export async function onEdit(id, event) {
	if (event.keyCode === KEY_CODE.ESC) {
		const updatedTodoList = this.todoList.map((item) => {
			if (item.id === id) {
				item.editing = false;
			}
			return item;
		});
		this.setState(updatedTodoList);
	} else if (event.keyCode === KEY_CODE.ENTER) {
		// const { response, error } = await request(
		// 	env.BASE_URL + env.USER_ITEM(this.users[this.selectedUserIdx].id, id),
		// 	"PUT",
		// 	{ contents: event.target.value }
		// );
		// if (error) {
		// 	alert("할 일 완료에 실패했습니다.");
		// 	return;
		// }

		const updatedTodoList = this.todoList.map((item) => {
			if (item.id === id) {
				item.contents = event.target.value;
				item.editing = false;
			}
			return item;
		});
		this.setState(updatedTodoList);
	}
}

export async function onSettingPriority(id, event) {
	if (event.target.value !== 0) {
		const priority = event.target.value === "1" ? "FIRST" : "SECOND";

		// const { response, error } = await request(
		// 	env.BASE_URL + env.ITEM_PRIORITY(this.users[this.selectedUserIdx].id, id),
		// 	"PUT",
		// 	{ priority }
		// );
		// if (error) {
		// 	alert("할 일 완료에 실패했습니다.");
		// 	return;
		// }

		const updatedTodoList = this.todoList.map((item) => {
			if (item.id === id) {
				item.priority = priority;
			}
			return item;
		});
		this.setState(updatedTodoList);
	}
}
