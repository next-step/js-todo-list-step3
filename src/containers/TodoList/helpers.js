export const buildNewState = (prevState, { type, data }) => {
  switch (type) {
    case 'ADDTODO':
      return addTodo(prevState, data)
    case 'DELETETODO':
      return deleteTodo(prevState, data)
    case 'UPDATETODO':
      return updateTodo(prevState, data)
    case 'UPDATEFILTER':
      return updateFilter(prevState, data)
    case 'DELETETODOS':
      return deleteTodos(prevState)
    default:
      return prevState
  }
}

const addTodo = (prevState, todo) => {
  const { member } = prevState
  return {
    ...prevState,
    member: { ...member, todoList: [...member.todoList, todo] },
  }
}
const deleteTodo = (prevState, itemId) => {
  const newTodoList = prevState.member.todoList.filter((todo) => {
    return todo._id !== itemId ? true : false
  })
  return {
    ...prevState,
    member: { ...prevState.member, todoList: newTodoList },
  }
}
const updateTodo = (prevState, newTodo) => {
  const newTodoList = prevState.member.todoList.map((todo) => {
    return todo._id === newTodo._id ? newTodo : todo
  })
  return {
    ...prevState,
    member: { ...prevState.member, todoList: newTodoList },
  }
}
const updateFilter = (prevState, selectedFilter) => {
  return {
    ...prevState,
    filter: selectedFilter,
  }
}

const deleteTodos = (prevState) => {
  return {
    ...prevState,
    member: { ...prevState.member, todoList: [] },
    filter: 'all',
  }
}
