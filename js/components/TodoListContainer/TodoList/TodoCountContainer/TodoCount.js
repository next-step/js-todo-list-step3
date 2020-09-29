import Component from '../../../../core/Component.js';

export default class TodoCount extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.todos.subscribe(this.render);
    this.render();
  }
  render = () => {
    this.$target.innerHTML = `
      총 <strong>${this.props.todos?.value.length || 0}</strong> 개
    `;
  };
}
