export const buildNewState = (prevState, { type, data }) => {
  switch (type) {
    case "ADDTODO":
      return addTodo(prevState, data);
    default:
      return prevState;
  }
};

const addTodo = (prevState, todo) => {
  const { member } = prevState;
  return {
    ...prevState,
    member: { ...member, todoList: [...member.todoList, todo] },
  };
};
