import { $ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";

import TodoList from "./TodoList.js";

class MemberList {
  render(memberList) {
    const template = memberList
      .map((member, index) => {
        return `<li class="todoapp-container" ><h2>
      <span><strong>${member.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
      <section class="input-container">
      <input class="new-todo" data-memberindex=${index} placeholder="할 일을 입력하세요." autofocus />
    </section>
    <section class="main">
      ${new TodoList({ memberIndex: index, filterType: member.filter }).render(member.todoList)}
    </section>
    <div class="count-container">
      <span class="todo-count">총 <strong>${member.todoList.length}</strong> 개</span>
      <ul class="filters"  data-memberindex=${index}>
        <li>
          <a href="#all"${member.filter === "all" && `class="selected"`}>전체보기</a>
        </li>
        <li>
          <a href="#priority"${member.filter === "priority" && `class="selected"`}>우선 순위</a>
        </li>
        <li>
          <a href="#active"${member.filter === "active" && `class="selected"`}>해야할 일</a>
        </li>
        <li>
          <a href="#completed"${member.filter === "completed" && `class="selected"`}>완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed"  data-memberindex=${index}>모두 삭제</button>
    </div></div></li>`;
      })
      .join("");

    $(".todoapp-list-container").innerHTML = template + TEMPLATE.ADD_MEMBER_BUTTON;
  }
}

export default MemberList;
