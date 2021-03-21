import TeamList from './TeamList.js';
import teamApi from '../apis/teamApi.js';

export default function Team($el) {

	const fetchTeams = async () => {

		const teams = await teamApi.findAllTeam();

		this.setState({
			teams: teams.map(({_id, name}) => ({
				teamId: _id,
				teamName: name,
			})),
		});
	}

	const createTeam = async (teamName) => {

		await teamApi.saveTeam(teamName);
		await fetchTeams();
	}

	const deleteTeam = async (teamId) => {

		await teamApi.deleteTeam(teamId);
		await fetchTeams();
	}

	const render = () => {

		this.$el.innerHTML = `
			<h1 id="team-list-title">
				<span><strong>Team</strong> List</span>
			</h1>
			<div class="team-list-container" data-component="team-list"></div>
		`;

		this.components.teamList = new TeamList(this.$el.querySelector('[data-component="team-list"]'), {teams: this.state.teams}, {createTeam, deleteTeam});
	};

	this.setState = (nextState) => {
		this.state = {
			...this.state,
			...nextState,
		};

		render();
	};

	const init = () => {

		this.$el = $el;
		this.state = {
			teams: [],
		};
		this.components = {};

		fetchTeams();
	};

	init();
}
