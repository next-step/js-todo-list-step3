import { kanbanAPI, teamAPI } from "./API.js";
import { $ } from "./Dom.js";
import { saveMemberInfo } from "./MemberInfo.js";
import { template } from "./Template.js";
import { renderTodoItem } from "./Todo.js";

const teamId = new URLSearchParams(document.location.search).get("id");

const $addUserButton = $("#add-user-button");

const loadTeam = async () => {
	return await teamAPI.fetchLoadTeam(teamId);
};

const setTeamName = async () => {
	const $teamTitle = $("#user-title");
	const team = await loadTeam();
	$teamTitle.dataset.username = team.name;
	$teamTitle.innerHTML = template.teamNameTemplate(team.name);
};

const renderNewList = (memberId, memberName) => {
	const newMember = template.kanbanAddTemplate(memberId, memberName);
	const $addUserButtonContainer = $addUserButton.closest(
		".add-user-button-container"
	);
	$addUserButtonContainer.insertAdjacentHTML("beforebegin", newMember);
};

const getMemberTodo = async () => {
	const team = await loadTeam();
	const members = team.members;
	members.map((member) => {
		saveMemberInfo(member._id, member.name, member.todoList);
		renderNewList(member._id, member.name);
		renderTodoItem(member._id, member.todoList);
	});
};

const addMember = async () => {
	const memberName = prompt("새로운 팀원 이름을 입력해주세요");
	if (memberName.length === 0) {
		alert("한 글자만이라도 써주세요..!");
	} else {
		await kanbanAPI.fetchAddMember(teamId, memberName);
		saveMemberInfo(memberName, []);
		renderNewList(memberName);
	}
};

$addUserButton.addEventListener("click", addMember);

setTeamName();
getMemberTodo();
