export default class TodoAppContainer {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<ul class="todoapp-list-container flex-column-container"></ul>`;
  }
}
