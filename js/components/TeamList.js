export default function TeamList($el, state) {

	const _makeTeamListItemTemplate = function (teams) {

		const {teamId, name} = teams;

		return `
			<div class="team-card-container">
					<a href="/kanban.html?teamId=${teamId}" class="card">
						<div class="card-title">
							${name}
						</div>
					</a>
			</div>
		`;
	}

	this.render = function () {

		this.$el.innerHTML = `

			${this.state.teams.map(team => _makeTeamListItemTemplate(team)).join('')}
			
			<div class="add-team-button-container">
				<button id="add-team-button" class="ripple">
					<span class="material-icons">add</span>
				</button>
			</div>
		`;
	}

	this.init = function () {

		this.$el = $el;
		this.state = {
			teams: state.teams,
		};

		this.render();
	};

	this.init();
}
