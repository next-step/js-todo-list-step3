import { MEMBER_PROPS } from '../../../../constants/PROPERTIES.js'

const renderTemplate = (TodoList) => {
  return `
    <div class="count-container">
      <span class="todo-count">총 <strong>${TodoList.length}</strong> 개</span>
      <ul class="filters">
        <li>
          <button type="button" data-type="all" class="filter">전체보기</button>
        </li>
        <li>
          <button type="button" data-type="priority" class="filter">우선 순위</button>
        </li>
        <li>
          <button type="button" data-type="active" class="filter">해야할 일</button>
        </li>
        <li>
          <button type="button" data-type="completed" class="filter">완료한 일</button>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
    </div>
  `
}

const TodoCount = (handleTodoActions) => {
  const render = (member) => {
    return renderTemplate(member[MEMBER_PROPS.TODO_LIST])
  }

  const listContainerElement = document.getElementById('todoapp-list-container')

  const handleFilterButton = (e) => {
    const { target } = e

    if (!target || target.tagName !== 'BUTTON' || !target.classList.contains('filter')) {
      return null
    }

    handleTodoActions.filterTodo(target)
  }

  listContainerElement.addEventListener('click', handleFilterButton)

  return { render }
}

export default TodoCount
