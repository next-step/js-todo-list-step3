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
    $store.todo.delete(memberId, todo._id);
  };

  init();

  return dom;
}
