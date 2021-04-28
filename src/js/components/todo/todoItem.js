export function TodoItem(
  id,
  inputContent,
  inputPriority = "NONE",
  completed = false
) {
  const _id = id;
  let content = inputContent;
  let priority = inputPriority;
  let isCompleted = completed;

  this.complete = () => (isCompleted = !isCompleted);
  this.matchId = (id) => _id === id;
  this.changeContent = (newContent) => (content = newContent);
  this.changePriority = (newPriority) => (priority = newPriority);

  this.getId = () => _id;
  this.getContent = () => content;
  this.getPriority = () => priority;
  this.isCompleted = () => isCompleted;
}

const priority = {
  NONE: `<select class="chip select" data-action="selectPriority" selectpriority="change">
        <option value="NONE" selected="">순위</option>
        <option value="FIRST">1순위</option>
        <option value="SECOND">2순위</option>
        </select>`,
  FIRST: `<span class="chip primary">1순위</span>`,
  SECOND: `<span class="chip secondary">2순위</span>`,
};

export const todoAppendElement = (member, target) => {
  const memberElement = document.createElement("div");
  memberElement.classList.add("todoapp-container");
  memberElement.setAttribute("data-member-id", `${member.getId()}`);
  memberElement.innerHTML = todoTemplate(member);
  target.appendChild(memberElement);
};

export const todoTemplate = (member) =>
  `
<h2 id="" class="">
  <span><strong>${member.getName()}</strong>'s Todo Lists</span>
</h2>
<div class="todoapp">
  <div id="" class="input-container">
    <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus="">
  </div>
    <div id="" class="main">
      <ul class="todo-list">
        
      </ul>
    </div>
    <div id="" class="count-container">
      <div id="" class="todo-count">
          총 <strong>0</strong> 개
      </div>
      <div id="" class="filters">
        <li>
        <a href="#all" data-type="all" class="selected">전체보기</a>
        </li>
        <li>
          <a href="#priority" data-type="priority">우선 순위</a>
        </li>
        <li>
          <a href="#active" data-type="active">해야할 일</a>
        </li>
        <li>
          <a href="#completed" data-type="completed">완료한 일</a>
        </li>
      </div>
      <button id="" class="clear-completed">모두 삭제</button>
    </div>
</div>

`;

export const todoItemTemplate = (item) =>
  `
<li class="todo-list-item ${
    item.isCompleted() ? "completed" : ""
  }" data-key="${item.getId()}">
  <div class="view">
    <input class="toggle" type="checkbox" ${
      item.isCompleted() ? "checked" : ""
    }>
    <label class="label">
      <div class="chip-container">
      
      ${priority[item.getPriority()]}

      </div>
        ${item.getContent()}
    </label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${item.getContent()}">
</li>
`;

export const parseItem = (item) =>
  new TodoItem(item._id, item.contents, item.priority, item.isCompleted);
