import request from "./util/request.js";
import ENV from "./constants/env.js";
import TeamApp from "./component/TeamApp.js";

const init = async () => {
	const { response: teams, error } = await request(ENV.BASE_URL + ENV.GET_TEAM_LIST);
	console.log("teams", teams);
	if (error) {
		alert("팀 목록을 가져오는데 실패했습니다");
		return;
	}

	new TeamApp(teams);
};

document.addEventListener("DOMContentLoaded", init);
