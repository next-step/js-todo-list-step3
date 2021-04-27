import { MEMBER_PROPS } from '../../../../constants/PROPERTIES.js'

const renderTemplate = (TodoList) => {
  return `
    <div class="count-container">
      <span class="todo-count">총 <strong>${TodoList.length}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#all" class="selected">전체보기</a>
        </li>
        <li>
          <a href="#priority">우선 순위</a>
        </li>
        <li>
          <a href="#active">해야할 일</a>
        </li>
        <li>
          <a href="#completed">완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
    </div>
  `
}

const TodoCount = () => {
  const render = (member) => {
    return renderTemplate(member[MEMBER_PROPS.TODO_LIST])
  }

  return { render }
}

export default TodoCount
