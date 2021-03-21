export default function TeamList($el, props, {createTeam, deleteTeam}) {

	function makeTeamListItemTemplate(team) {

		const {teamId, teamName} = team;

		return `
			<div class="team-card-container">
				<a href="./kanban.html?teamId=${teamId}" class="card" data-action="removeTeam" data-team-id="${teamId}">
					<div class="card-title">
						${teamName}
					</div>
				</a>
			</div>
		`;
	}

	function addTeam() {
		const teamName = prompt('팀 이름을 입력해주세요');
		if (!teamName || teamName.trim() === '') {
			return;
		}
		createTeam(teamName);
	}

	function removeTeam({teamId, teamName}) {

		if (!confirm(`${teamName} 팀을 삭제하시겠습니까?`)) {
			return;
		}
		deleteTeam(teamId);
	}

	const bindEvents = () => {

		this.$el.addEventListener('click', event => {

			if (event.target.closest('[data-action="addTeam"]')) {
				addTeam();
			}
		});

		this.$el.addEventListener('contextmenu', event => {

			const $teamListItem = event.target.closest('[data-action="removeTeam"]');
			if ($teamListItem) {
				event.preventDefault();
				const team = this.state.teams.find(team => team.teamId === $teamListItem.dataset.teamId);
				removeTeam({teamId: team.teamId, teamName: team.teamName});
			}
		});
	};

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
	};

	const init = () => {

		this.$el = $el;
		this.state = {
			teams: props.teams,
		};

		render();
	};

	init();
}
