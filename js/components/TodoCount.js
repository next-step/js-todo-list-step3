export default class TodoCount {
  constructor({ $countContainer, totalCount }) {
    this.$countContainer = $countContainer;
    this.totalCount = totalCount;

    this.render();
  }

  render() {
    this.$countContainer.innerHTML = `<span class="todo-count">총 <strong>${this.totalCount}</strong> 개</span>`;
  }

  setState(totalCount) {
    this.totalCount = totalCount;
    this.render();
  }
}
