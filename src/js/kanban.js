import { $ } from "./Dom.js";
import { template } from "./Template.js";

const setTeamName = () => {
	const $teamTitle = $("#user-title");
	const teamName = new URLSearchParams(document.location.search).get("name");
	$teamTitle.innerHTML = template.kanbanTitleTemplate(teamName);
};

// const $addUserButton = $("#add-user-button");
// $addUserButton.addEventListener("click", () => {
// 	const memberName = prompt("새로운 팀원 이름을 입력해주세요");
// });

setTeamName();
