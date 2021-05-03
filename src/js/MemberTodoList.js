const memberTodoList = {
	member: "",
	todoList: [],
};

const getMemberTodoList = () => memberTodoList;
const saveMemberTodoList = (member, todoList) => {
	memberTodoList.member = member;
	memberTodoList.todoList = todoList;
};

export { getMemberTodoList, saveMemberTodoList };
