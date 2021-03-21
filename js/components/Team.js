import TeamList from './TeamList.js';

const MOCK_TEAMS = [
	{
		teamId: 123,
		name: 'teamA',
	},
	{
		teamId: 456,
		name: 'teamB',
	}
]

export default function Team($el) {

	this.render = function () {

		this.$el.innerHTML = `
			<h1 id="team-list-title">
				<span><strong>Team</strong> List</span>
			</h1>
			<div class="team-list-container" data-component="team-list"></div>
		`;

		this.components.teamList = new TeamList(this.$el.querySelector('[data-component="team-list"]'), {teams: this.state.teams});
	};

	this.init = function () {

		this.$el = $el;
		this.state = {
			teams: MOCK_TEAMS,
		};
		this.components = {};

		this.render();
	};

	this.init();
}
