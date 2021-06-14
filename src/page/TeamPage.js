import Component from '../core/Component.js';

export default class TeamPage extends Component {
  constructor($element) {
    super($element);
  }
  template() {
    return `
        <div>팀</div>
      `;
  }
  render() {
    this.$element.innerHTML = this.template();
  }
}
