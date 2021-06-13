export default {
  template: (count) => `
  <div class="count-container">
    <span class="todo-count">총 <strong>${count}</strong> 개</span>
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
  </div>`
}