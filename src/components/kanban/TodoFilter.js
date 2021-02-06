import { createElement } from "../../utils/createElement.js";

import TodoFilterItem from "./TodoFilterItem.js";
import { FILTERS } from "../../utils/constants.js";

const template = `
  <ul class="filters">
    <li class="all">전체보기</li>
    <li class="priority">우선 순위</li>
    <li class="active">해야할 일</li>
    <li class="completed">완료한 일</li>
  </ul>
`;

export default function TodoFilter({ memberId }) {
  const dom = createElement(template);

  const init = () => {
    render();
  };

  const render = () => {
    dom.innerHTML = "";
    Object.values(FILTERS).forEach(renderEachFilter);
  };

  const renderEachFilter = (filter) => {
    const todoFilterItem = new TodoFilterItem({ memberId, filter });
    dom.appendChild(todoFilterItem);
  };

  init();

  return dom;
}
