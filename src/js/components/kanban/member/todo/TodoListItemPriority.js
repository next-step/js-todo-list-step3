import { PRIORITY, TODO_PROPS } from '../../../../constants/PROPERTIES.js'

const renderTemplate = (priority) => {
  return `
    <div class="chip-container">
      <select class="chip select ${PRIORITY[priority].class}">
        <option value="0" ${PRIORITY[priority].value === '0' ? 'selected' : ''}>순위</option>
        <option value="1" ${PRIORITY[priority].value === '1' ? 'selected' : ''}>1순위</option>
        <option value="2" ${PRIORITY[priority].value === '2' ? 'selected' : ''}>2순위</option>
      </select>
    </div>
  `
}

const TodoListPriority = (handleTodoActions) => {
  const render = (Todo) => {
    return renderTemplate(Todo[TODO_PROPS.PRIORITY])
  }

  const listContainerElement = document.getElementById('todoapp-list-container')

  const changePriority = (e) => {
    const { target } = e

    if (!target || target.tagName !== 'SELECT' || !target.classList.contains('chip')) {
      return null
    }

    handleTodoActions.changePriorityTodo(target)
  }

  listContainerElement.addEventListener('change', changePriority)

  return { render }
}

export default TodoListPriority
