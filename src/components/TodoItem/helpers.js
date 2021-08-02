import { PRIORITY_WEIGHT } from './constants.js'

export const filterTodoList = (filter, member) => {
  if (filter === 'all') return member.todoList
  if (filter === 'priority') {
    return [...member.todoList].sort((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority])
  }
  return member.todoList.filter((todo) => {
    if (filter === 'active') return todo.isCompleted ? false : true
    if (filter === 'completed') return todo.isCompleted ? true : false
  })
}
