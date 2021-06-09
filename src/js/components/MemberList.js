import { $ } from "../lib/util.js";
import { TEMPLATE } from "../constants/template.js";

class MemberList {
  constructor({ memberList, onAddMember }) {
    this.memberList = memberList;
    this.onAddMember = onAddMember;
    this.init();
  }

  init() {
    this.render();
  }

  setState(updatedData) {
    this.memberList = updatedData;
    this.render();
  }

  render() {
    const template = this.memberList
      .map((member) => {
        return `<li class="todoapp-container">
    <h2>
    <span><strong>${member.name}</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
<section class="input-container">
  <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
</section>
<section class="main">
  <ul class="todo-list">
    <li class="todo-list-item">
    </li>
  </ul>
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
</div>
</div>
    </li>`;
      })
      .join("");

    $(".todoapp-list-container").innerHTML = template + TEMPLATE.ADD_MEMBER_BUTTON;

    this.registerEventListener();
  }

  registerEventListener() {
    $("#add-user-button").addEventListener("click", this.onAddMember);
  }
}

export default MemberList;
