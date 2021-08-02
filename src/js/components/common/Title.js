import Component from '../../core/Component.js';
import { store } from '../../store/index.js';

export default class Title extends Component {
  template() {
    return `<span><strong>${store.state.name}</strong>'s Todo Lists</span>`;
  }
}
