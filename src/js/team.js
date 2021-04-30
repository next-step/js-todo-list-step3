import { teamAPI } from "./API.js";
import { $ } from "./Dom.js";
import { template } from "./Template.js";

const $teamList = $(".team-list-container");
const $addTeamBtn = $("#add-team-button");

const renderNewTeam = (teamId, teamName) => {
	const newTeam = template.teamAddTemplate(teamId, teamName);
	$teamList.insertAdjacentHTML("afterbegin", newTeam);
};

$addTeamBtn.addEventListener("click", async () => {
	const teamName = prompt("팀 이름을 입력해주세요");
	if (!teamName && teamName.length === 0) {
		alert("한 글자만이라도 써주세요..!");
	} else {
		const team = await teamAPI.fetchAddTeam(teamName);
		renderNewTeam(team._id, team.name);
	}
});

const renderTeamList = (teamList) => {
	teamList.map((team) => renderNewTeam(team._id, team.name));
};

export const showTeams = async () => {
	const teamList = await teamAPI.fetchTeamList();
	renderTeamList(teamList);
};
