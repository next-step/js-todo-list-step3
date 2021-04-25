import Mode from "../../constants/Mode.js";

function onChangeMode(mode) {
	let nextTodoItems;

	const convertPriorityIntoNum = (priority) => {
		switch (priority) {
			case "NONE":
				return 0;
			case "FIRST":
				return 2;
			case "SECOND":
				return 1;
		}
	};

	switch (mode) {
		case Mode.ALL:
			nextTodoItems = this.todoList;
			break;
		case Mode.TODO:
			nextTodoItems = this.todoList.filter((item) => !item.completed);
			break;
		case Mode.PRIORITY:
			nextTodoItems = [...this.todoList].sort(
				(a, b) => convertPriorityIntoNum(b.priority) - convertPriorityIntoNum(a.priority)
			);
			break;
		case Mode.COMPLETED:
			nextTodoItems = this.todoList.filter((item) => item.completed);
			break;
	}
	this.render(nextTodoItems);
}

export default onChangeMode;
