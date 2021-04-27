import { kanbanAPI, teamAPI } from "./API.js";
import { $ } from "./Dom.js";
import { template } from "./Template.js";

const teamId = new URLSearchParams(document.location.search).get("id");

const $addUserButton = $("#add-user-button");

const loadTeam = async () => {
	return await teamAPI.fetchLoadTeam(teamId);
};

const setTeamName = async () => {
	const $teamTitle = $("#user-title");
	const team = await loadTeam();
	$teamTitle.innerHTML = template.kanbanTitleTemplate(team.name);
};

const renderNewList = (member) => {
	const newMember = template.kanbanAddTemplate(member.name);
	const $addUserButtonContainer = $addUserButton.closest(
		".add-user-button-container"
	);
	$addUserButtonContainer.insertAdjacentHTML("beforebegin", newMember);
};

const getMemberTodo = async () => {
	const team = await loadTeam();
	const members = team.members;
	members.map(async (member) => {
		console.log(member);
	});
};

$addUserButton.addEventListener("click", async () => {
	const memberName = prompt("새로운 팀원 이름을 입력해주세요");
	if (memberName.length === 0) {
		alert("한 글자만이라도 써주세요..!");
	} else {
		const member = await kanbanAPI.fetchAddMember(teamId, memberName);
		renderNewList(member);
	}
});

setTeamName();
getMemberTodo();
