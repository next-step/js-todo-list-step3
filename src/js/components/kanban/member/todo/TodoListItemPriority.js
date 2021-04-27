import { PRIORITY, TODO_PROPS } from '../../../../constants/PROPERTIES.js'

const renderTemplate = (priority) => {
  return `
    <div class="chip-container">
      ${priority === PRIORITY.NONE.key
        ? '<select class="chip select">'
        : `
            <span class="chip ${PRIORITY[priority].class}">
              ${PRIORITY[priority].value}
            </span>
            <select class="chip select hidden">
          `
      }
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
    </div>
  `
}

const TodoListPriority = () => {
  const render = (Todo) => {
    return renderTemplate(Todo[TODO_PROPS.PRIORITY])
  }

  return { render }
}

export default TodoListPriority
