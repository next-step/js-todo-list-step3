import { MEMBER_PROPS } from '../../../../constants/PROPERTIES.js'
import TodoListItem from './TodoListItem.js'

const renderTemplate = (children) => {
  return `
    <section class="main">
      <ul class="todo-list">
        ${children}
      </ul>
    </section>
  `
}

const TodoList = ({ onDeleteTodo }) => {
  const todoListItem = TodoListItem({ onDeleteTodo })
  const render = (member) => {
    const childrenArray = member[MEMBER_PROPS.TODO_LIST].map(Todo => todoListItem.render(Todo))
    return renderTemplate(childrenArray.join(''))
  }

  return { render }
}

export default TodoList
