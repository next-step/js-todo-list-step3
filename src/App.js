import Component from './core/Component.js';
import { initialRoutes } from './Router/index.js';

export default class App extends Component {
  constructor($element) {
    super($element);
  }
  mounted() {
    initialRoutes();
  }
  template() {
    return `
        <div>하이하이</div>
      `;
  }
  render() {
    this.$element.innerHTML = this.template();
    this.mounted();
  }
}
