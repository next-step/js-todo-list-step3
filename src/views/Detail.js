export default class Detail {
  constructor() {
    this.render();
  }
  template() {
    return `
        <div>디테일</div>
      `;
  }
  render() {
    this.$element.innerHTML = this.template();
  }
}
