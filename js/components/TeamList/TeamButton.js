import Component from '../../core/Component.js';

export default class TeamButton extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = `
      <a id="${this.props._id}" href="/kanban.html" class="card">
        <div class="card-title">${this.props.name}</div>
      </a>
		`;
  };
}
