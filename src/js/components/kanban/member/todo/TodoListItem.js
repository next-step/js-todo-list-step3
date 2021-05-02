import { TODO_PROPS } from '../../../../constants/PROPERTIES.js'

import TodoListItemPriority from './TodoListItemPriority.js'

const renderTemplate = (Todo, children) => {
  return `
    <li ${Object.keys(Todo)
      .map((key) => `data-${key}="${Todo[key]}"`)
      .join('')}
      ${Todo[TODO_PROPS.IS_COMPLETED] ? 'class="completed"' : ''}
      data-type="todo"
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          ${Todo[TODO_PROPS.IS_COMPLETED] ? 'checked' : ''}
        />
        <label class="label">
          ${children}
          ${Todo[TODO_PROPS.CONTENTS]}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${Todo[TODO_PROPS.CONTENTS]}" />
    </li>
  `
}

const TodoListItem = (handleTodoActions) => {
  const todoListItemPriority = TodoListItemPriority()
  const render = (Todo) => {
    const childrenArray = [todoListItemPriority.render(Todo)]
    return renderTemplate(Todo, childrenArray.join(''))
  }

  const listContainerElement = document.getElementById('todoapp-list-container')

  const deleteTodoItem = (e) => {
    const { target } = e
    e.stopPropagation()

    if (!target || target.tagName !== 'BUTTON' || !target.classList.contains('destroy')) {
      return console.log('not here')
    }

    handleTodoActions.deleteTodo(target)
  }

  listContainerElement.addEventListener('click', deleteTodoItem)

  return { render }
}

export default TodoListItem
