import { createElement } from "../../utils/createElement.js";
import $store from "../../store/index.js";

import { FILTERS } from "../../utils/constants.js";

const template = `
  <li class="">text</li>
`;

export default function TodoFilterItem({ memberId, filter }) {
  const dom = createElement(template);

  const init = () => {
    if (filter === FILTERS.ALL) {
      dom.classList.add("selected");
    }
    dom.addEventListener("click", selectFilter);
    render();
  };

  const render = () => {
    dom.classList.add(filter.state);
    dom.innerText = filter.text;
  };

  const selectFilter = ({ target }) => {
    const previous = target.closest(".filters").querySelector(".selected");
    previous.classList.remove("selected");
    dom.classList.add("selected");

    $store.todo.setFilter(memberId, filter);
  };

  init();

  return dom;
}
