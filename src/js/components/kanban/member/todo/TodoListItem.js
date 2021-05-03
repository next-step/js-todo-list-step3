import { TODO_PROPS } from '../../../../constants/PROPERTIES.js'

import TodoListItemPriority from './TodoListItemPriority.js'

const renderTemplate = (Todo, children) => {
  return `
    <li ${Object.keys(Todo)
      .map((key) => `data-${key}="${Todo[key]}"`)
      .join('')}
      class="todo-list-item ${Todo[TODO_PROPS.IS_COMPLETED] ? 'completed' : ''}"
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
  const todoListItemPriority = TodoListItemPriority(handleTodoActions)
  const render = (Todo) => {
    const childrenArray = [todoListItemPriority.render(Todo)]
    return renderTemplate(Todo, childrenArray.join(''))
  }

  const listContainerElement = document.getElementById('todoapp-list-container')

  const deleteTodoItem = (e) => {
    const { target } = e
    e.stopPropagation()

    if (!target || target.tagName !== 'BUTTON' || !target.classList.contains('destroy')) {
      return null
    }

    handleTodoActions.deleteTodo(target)
  }

  const toggleTodoItem = (e) => {
    const { target } = e
    e.stopPropagation()

    if (!target || target.tagName !== 'INPUT' || !target.classList.contains('toggle')) {
      return null
    }

    handleTodoActions.toggleTodo(target)
  }

  const editModeTodoItem = (e) => {
    const { target } = e
    e.stopPropagation()

    if (!target || target.tagName !== 'LABEL' || !target.classList.contains('label')) {
      return null
    }

    const todoItem = target.closest('li.todo-list-item')
    todoItem.classList.add('editing')
  }

  const editCompleteTodoItem = (e) => {
    const { target, key } = e

    if (!target || target.tagName !== 'INPUT' || !target.classList.contains('edit')) {
      return null
    }

    if (key !== 'Enter' && key !== 'Esc' && key !== 'Escape') {
      return null
    }

    if (target.value.trim().length < 2) {
      return alert('2글자 이상이어야 합니다.')
    }

    const todoItem = target.closest('li.todo-list-item')

    if (key === 'Esc' || key === 'Escape') {
      return todoItem.classList.remove('editing')
    }

    handleTodoActions.editTodo(target)
    todoItem.classList.remove('editing')
  }

  listContainerElement.addEventListener('click', deleteTodoItem)
  listContainerElement.addEventListener('click', toggleTodoItem)
  listContainerElement.addEventListener('dblclick', editModeTodoItem)
  listContainerElement.addEventListener('keydown', editCompleteTodoItem)

  return { render }
}

export default TodoListItem
