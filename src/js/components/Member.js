import TodoItems from "./TodoItems.js";

class Member {
  render(member) {
    const template = `<h2>
      <span><strong>${member.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
      <section class="input-container">
      <input class="new-todo" placeholder="할 일을 입력하세요." autofocus />
    </section>
    <section class="main">
      ${new TodoItems().render(member.todoList)}
    </section>
    <div class="count-container">
      <span class="todo-count">총 <strong>0</strong> 개</span>
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
    </div></div>`;

    return template;
  }
}

export default Member;
