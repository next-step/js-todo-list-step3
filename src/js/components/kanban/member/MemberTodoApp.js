import TodoCount from './todo/TodoCount.js'
import TodoInput from './todo/TodoInput.js'
import TodoList from './todo/TodoList.js'

const renderTemplate = (children) => {
  return `
    <div class="todoapp">${children}</div>
  `
}

const MemberTodoApp = (handleTodoActions) => {
  const todoInput = TodoInput(handleTodoActions)
  const todoList = TodoList(handleTodoActions)
  const todoCount = TodoCount(handleTodoActions)

  const render = (member) => {
    const childrenArray = [todoInput.render(member), todoList.render(member), todoCount.render(member)]
    return renderTemplate(childrenArray.join(''))
  }

  return { render }
}

export default MemberTodoApp
