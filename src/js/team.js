import { teamAPI } from "./API.js";
import { $ } from "./Dom.js";
import { template } from "./Template.js";

const $teamList = $(".team-list-container");
const $addTeamBtn = $("#add-team-button");

const renderNewTeam = (teamName) => {
	const newTeam = template.teamAddTemplate(teamName);
	$teamList.insertAdjacentHTML("afterbegin", newTeam);
};

$addTeamBtn.addEventListener("click", async () => {
	const teamName = prompt("팀 이름을 입력해주세요");
	if (teamName.length === 0) {
		alert("한 글자만이라도 써주세요..!");
	} else {
		renderNewTeam(teamName);
		await teamAPI.fetchAddTeam(teamName);
	}
});

const renderTeamList = (teamList) => {
	teamList.map((team) => renderNewTeam(team.name));
};

export const showTeams = async () => {
	const teamList = await teamAPI.fetchTeamList();
	renderTeamList(teamList);
};
