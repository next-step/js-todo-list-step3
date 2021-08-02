export default {
  template: (count, filter) => `
  <div class="count-container">
    <span class="todo-count">총 <strong>${count}</strong> 개</span>
    <ul class="filters">
      <li>
        <a href="#all" class="all filter ${filter === 2 || filter === 5 ? 'selected' : ''}">전체보기</a>
      </li>
      <li>
        <a href="#priority" class="priority filter ${filter >= 3 ? 'selected' : ''}">우선 순위</a>
      </li>
      <li>
        <a href="#active" class="active filter ${filter === 0 || filter === 3 ? 'selected' : ''}">해야할 일</a>
      </li>
      <li>
        <a href="#completed" class="completed filter ${filter === 1 || filter === 4 ? 'selected' : ''}">완료한 일</a>
      </li>
    </ul>
    <button class="clear-completed">모두 삭제</button>
  </div>`
}