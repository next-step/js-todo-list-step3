import Component from '../core/Component.js';

export default class DetailPage extends Component {
  constructor($element) {
    super($element);
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
