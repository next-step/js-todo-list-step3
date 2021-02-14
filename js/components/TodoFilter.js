import Component from "../core/Component.js";

export default class TodoFilter extends Component {
  template() {
    const { typeOfFilter, filteredList } = this.props;
    return `
    <span class="todo-count">총 <strong>0</strong> 개</span>
    <ul class="filters">
      <li>
        <a href="#all" class="selected">전체보기</a>
      </li>
      <li>
        <a href="#priority">우선 순위</a>
      </li>
      <li>
        <a href="#active">해야할 일</a>
      </li>
      <li>
        <a href="#completed">완료한 일</a>
      </li>
    </ul>
    <button class="clear-completed">모두 삭제</button>
`;
    // return `
    //     <span class="todo-count">총 <strong>${
    //       filteredList.length
    //     }</strong> 개</span>
    //     <ul class="filters">
    //       <li>
    //         <button class="filterBtn" data-type-of-filter="all" ${
    //           typeOfFilter === "all" &&
    //           'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
    //         }>전체보기</button>
    //       </li>
    //       <li>
    //         <button class="filterBtn" data-is-completed="false" ${
    //           typeOfFilter === "doing" &&
    //           'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
    //         }>해야할 일</button>
    //       </li>
    //       <li>
    //         <button class="filterBtn" data-is-completed="true" ${
    //           typeOfFilter === "completed" &&
    //           'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
    //         }>완료한 일</button>
    //       </li>
    //     </ul>
    //     `;
  }
  setEvent() {
    const { filterList } = this.props;
    this.addEvent("click", ".filterBtn", ({ target }) => {
      const typeOfFilter = target.dataset.typeOfFilter;
      filterList(typeOfFilter);
    });
  }
}
