import { kanbanAPI, teamAPI } from "./API.js";
import { $ } from "./Dom.js";
import { template } from "./Template.js";

const teamId = new URLSearchParams(document.location.search).get("id");

const $addUserButton = $("#add-user-button");

const setTeamName = async () => {
	const $teamTitle = $("#user-title");
	const team = await teamAPI.fetchLoadTeam(teamId);
	$teamTitle.innerHTML = template.kanbanTitleTemplate(team.name);
};

const renderNewList = () => {};

$addUserButton.addEventListener("click", async () => {
	const memberName = prompt("새로운 팀원 이름을 입력해주세요");
	if (memberName.length === 0) {
		alert("한 글자만이라도 써주세요..!");
	} else {
		await kanbanAPI.fetchAddMember();
		renderNewList();
	}
});

const loadTeamList = async () => {};

setTeamName();
