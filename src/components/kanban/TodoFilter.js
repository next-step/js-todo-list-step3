import { createElement } from "../../utils/createElement.js";

const template = `
  <ul class="filters">
    <li class="all">전체보기</li>
    <li class="priority">우선 순위</li>
    <li class="active">해야할 일</li>
    <li class="completed">완료한 일</li>
  </ul>
`;

export default function TodoFilter() {
  const dom = createElement(template);

  return dom;
}
