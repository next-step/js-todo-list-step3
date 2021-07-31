import Component from '../../core/Component.js';

export default class Title extends Component {
  template() {
    return `
      <span><strong>${this.$props.title}</strong>'s Todo Lists</span>
    `;
  }
}
