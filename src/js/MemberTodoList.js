let memberTodoList = [];

const getMemberTodoList = () => memberTodoList;
const saveMemberTodoList = (todoList) => {
	memberTodoList = todoList;
};

export { getMemberTodoList, saveMemberTodoList };
