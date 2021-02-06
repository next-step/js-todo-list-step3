import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

import { PRIORITY } from "../../utils/constants.js";

const template = `
  <li class="todo-list-item">
    <div class="view">
      <input 
        class="toggle" 
        type="checkbox" 
      />
      <label class="label">
        <div class="chip-container">
          <select class="chip select">
            <option value="NONE" selected>순위</option>
            <option value="FIRST">1순위</option>
            <option value="SECOND">2순위</option>
          </select>
        </div>
        <span>contents</span>
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="contents" />
  </li>
`;

export default function TodoListItem({ memberId, todo }) {
  const dom = createElement(template);
  const label = dom.querySelector(".label span");
  const toggleBtn = dom.querySelector(".toggle");
  const deleteBtn = dom.querySelector(".destroy");
  const editInput = dom.querySelector(".edit");
  const chip = dom.querySelector(".chip-container");
  const prioritySelector = dom.querySelector(".select");

  const init = () => {
    deleteBtn.addEventListener("click", deleteTodo);
    toggleBtn.addEventListener("click", toggleTodo);
    label.addEventListener("dblclick", toggleEditingTodo);
    editInput.addEventListener("keypress", editTodo);
    editInput.addEventListener("focusout", cancelEditingTodo);
    prioritySelector.addEventListener("change", selectPriority);
    render();
  };

  const render = () => {
    const { contents, isCompleted, priority } = todo;

    label.innerText = contents;
    editInput.value = contents;
    if (isCompleted) {
      dom.classList.add("completed");
      toggleBtn.checked = isCompleted;
    }
    if (priority !== PRIORITY.NONE.value) {
      chip.innerHTML = renderPriority(priority);
    }
  };

  const renderPriority = ({ className, text }) => `
    <span class="chip ${className}">${text}</span>
  `;

  const deleteTodo = async () => {
    dom.remove();
    await $store.todo.delete(memberId, todo._id);
  };

  const toggleTodo = async () => {
    dom.classList.toggle("completed");
    await $store.todo.toggle(memberId, todo._id);
  };

  const toggleEditingTodo = () => {
    const editingItem = document.querySelector(".editing");
    editingItem?.classList.remove("editing");

    dom.classList.add("editing");
  };

  const editTodo = async ({ key, target }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents?.length < 2) {
      alert("할 일은 최소 2글자 이상이어야 합니다.");
      return;
    }

    label.innerText = contents;
    dom.classList.remove("editing");

    await $store.todo.edit(memberId, todo._id, contents);
  };

  const cancelEditingTodo = () => {
    editInput.value = todo.contents;
    dom.classList.remove("editing");
  };

  const selectPriority = async () => {
    const selected = Object.values(PRIORITY).find(
      ({ value }) => value === prioritySelector.value
    );

    await $store.todo.setPriority(memberId, todo._id, selected.value);
  };

  init();

  return dom;
}
