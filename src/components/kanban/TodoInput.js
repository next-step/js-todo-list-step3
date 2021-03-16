import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

const template = `
  <input
    class="new-todo"
    placeholder="할 일을 입력해주세요."
    autofocus
  />
`;

export default function TodoInput({ memberId }) {
  const dom = createElement(template);

  const init = () => {
    dom.addEventListener("keypress", addTodo);
  };

  const addTodo = async ({ target, key }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents.length < 2) {
      return;
    }

    try {
      await $store.todo.create(memberId, contents);
      target.value = "";
    } catch (e) {
      console.error(e);
    }
  };

  init();

  return dom;
}
