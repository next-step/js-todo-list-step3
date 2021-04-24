import Team from "./model/Team.js";

import TeamList from "./TeamList.js";

function TeamApp(teams) {
	this.teams = teams.map((team) => {
		return new Team({
			id: team._id,
			name: team.name,
			members: team.members
		});
	});

	const teamListTarget = document.querySelector(".team-list-container");

	this.teamList = new TeamList({ target: teamListTarget });

	this.render = () => {
		this.teamList.setState(this.teams);
	};

	this.render();
}

export default TeamApp;
