import { createElement } from "../../utils/createElement.js";

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

export default function TodoListItem({ todo }) {
  const dom = createElement(template);
  const label = dom.querySelector(".label");
  const toggleBtn = dom.querySelector(".toggle");
  const editInput = dom.querySelector(".edit");

  const init = () => {
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

  init();

  return dom;
}
