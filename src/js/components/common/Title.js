export default class Title {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.innerHTML = `<span><strong>Team</strong>'s Todo Lists</span>`;
  }
}
