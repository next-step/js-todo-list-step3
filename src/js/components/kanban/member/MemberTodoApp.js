import TodoInput from './todo/TodoInput.js'

const renderTemplate = (children) => {
  return `
    <div class="todoapp">${children}</div>
  `
}

const MemberTodoApp = ({ onAddTodo }) => {
  const todoInput = TodoInput({ onAddTodo })

  const render = (member) => {
    const childrenArray = [todoInput.render(member)]
    return renderTemplate(childrenArray)
  }

  return { render }
}

export default MemberTodoApp
