export default function TeamList($el, state, {createTeam}) {

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

	function addTeam () {
		const teamName = prompt('팀 이름을 입력해주세요');
		if (!teamName || teamName.trim() === '') {
			return;
		}
		createTeam(teamName);
	}

	const bindEvents = () => {

		this.$el.addEventListener('click', event => {

			if (event.target.closest('[data-action="addTeam"]')) {
				addTeam();
			}
		})
	}

	const render = () => {

		this.$el.innerHTML = `

			${this.state.teams.map(team => makeTeamListItemTemplate(team)).join('')}
			
			<div class="add-team-button-container">
				<button id="add-team-button" class="ripple" data-action="addTeam">
					<span class="material-icons">add</span>
				</button>
			</div>
		`;

		bindEvents();
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
