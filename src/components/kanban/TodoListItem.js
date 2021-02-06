import { createElement } from "../../utils/createElement.js";

const template = ({ contents, isCompleted }) => `
  <li class="todo-list-item ${isCompleted ? "completed" : ""}">
    <div class="view">
      <input 
        class="toggle" 
        type="checkbox" 
        ${isCompleted ? "checked" : ""}
      />
      <label class="label">
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>
`;

export default function TodoListItem({ todo }) {
  const dom = createElement(template(todo));

  return dom;
}
