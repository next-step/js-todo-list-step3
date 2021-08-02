import { $ } from "../utils/querySelector.js";
import Api from "../api/api.js";

export default function TeamList(render) {

	this.setState = (teams) => {
		addTeams(teams);
		addEvent();
	}

	const addTeams = (teams) => {
		const $teamListContainer = $(".team-list-container");
		const addTeam = $(".add-team-button-container").outerHTML;
		let teamItems = "";

		$teamListContainer.innerHTML = "";

		teams.map(({ _id, name }) => teamItems += `
	        <div class="team-card-container" data-id="${ _id }">
	          <a href="/kanban.html?page=teamDetail&id=${ _id }" class="card">
	            <div class="card-title">
	              ${ name }
	            </div>
	          </a>
	        </div>
		`);

		teamItems += addTeam;
		$teamListContainer.innerHTML = teamItems;
	}

	const addEvent = () => {
		$('#add-team-button').addEventListener('click', () => {
			const result = prompt('팀 이름을 입력해주세요');
			addTeam(result);
		});
	}

	const addTeam = async (result) => {
		await Api.postFetch("/api/teams", { name: result });
		render();
	}
}