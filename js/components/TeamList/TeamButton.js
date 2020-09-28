import Component from '../../core/Component.js';

export default class TeamButton extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = `
			<div class="team-card-container">
				<a href="/kanban.html" class="card">
				<div class="card-title">Black Coffee team</div>
				</a>
			</div>
		`;
  };
}
