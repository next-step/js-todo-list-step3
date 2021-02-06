import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

const template = `
  <li class="todo-list-item">
    <div class="view">
      <input 
        class="toggle" 
        type="checkbox" 
      />
      <label class="label">
        contents
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="contents" />
  </li>
`;

export default function TodoListItem({ memberId, todo }) {
  const dom = createElement(template);
  const label = dom.querySelector(".label");
  const toggleBtn = dom.querySelector(".toggle");
  const deleteBtn = dom.querySelector(".destroy");
  const editInput = dom.querySelector(".edit");

  const init = () => {
    deleteBtn.addEventListener("click", deleteTodo);
    toggleBtn.addEventListener("click", toggleTodo);
    label.addEventListener("dblclick", toggleEditingTodo);
    editInput.addEventListener("keypress", editTodo);
    editInput.addEventListener("focusout", cancelEditingTodo);
    render();
  };

  const render = () => {
    const { contents, isCompleted } = todo;

    label.innerText = contents;
    editInput.value = contents;
    if (isCompleted) {
      dom.classList.add("completed");
      toggleBtn.checked = isCompleted;
    }
  };

  const deleteTodo = () => {
    dom.remove();
    $store.todo.delete(memberId, todo._id);
  };

  const toggleTodo = () => {
    dom.classList.toggle("completed");
    $store.todo.toggle(memberId, todo._id);
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

  init();

  return dom;
}
