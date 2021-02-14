import Component from "../core/Component.js";

export default class TodoFilter extends Component {
  template() {
    const { typeOfFilter, filteredList } = this.props;
    return `
    <span class="todo-count">총 <strong>${
      filteredList.length
    }</strong> 개</span>
    <ul class="filters">
      <li>
        <button class="filterBtn ${
          typeOfFilter === "all" && "selected"
        }" data-type-of-filter="all" >전체보기</button>
      </li>
      <li>
        <button class="filterBtn">우선 순위</button>
      </li>
      <li>
        <button class="filterBtn ${
          typeOfFilter === "false" && "selected"
        }" data-type-of-filter="false" >해야할 일</button>
      </li>
      <li>
        <button class="filterBtn ${
          typeOfFilter === "true" && "selected"
        }" data-type-of-filter="true" >완료한 일</button>
      </li>
    </ul>
    <button class="clear-completed">모두 삭제</button>
`;
  }
  setEvent() {
    const { filterList, deleteAllTodo } = this.props;
    this.addEvent("click", ".filterBtn", ({ target }) => {
      const typeOfFilter = target.dataset.typeOfFilter;
      filterList(typeOfFilter);
    });
    this.addEvent("click", ".clear-completed", () => {
      deleteAllTodo();
    });
  }
}
