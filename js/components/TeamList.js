export default function TeamList($el, state) {

	function makeTeamListItemTemplate (team) {

		const {teamId, teamName} = team;

		return `
			<div class="team-card-container">
				<a href="/kanban.html?teamId=${teamId}" class="card">
					<div class="card-title">
						${teamName}
					</div>
				</a>
			</div>
		`;
	}

	const render = () => {

		this.$el.innerHTML = `

			${this.state.teams.map(team => makeTeamListItemTemplate(team)).join('')}
			
			<div class="add-team-button-container">
				<button id="add-team-button" class="ripple">
					<span class="material-icons">add</span>
				</button>
			</div>
		`;
	}

	const init = () => {

		this.$el = $el;
		this.state = {
			teams: state.teams,
		};

		render();
	};

	init();
}
