import TodoApp from "./component/TodoApp.js";
import request from "./util/request.js";
import ENV from "./constants/env.js";

import getParams from "./util/getQueryString.js";

const init = async () => {
	const teamId = getParams.get("id");
	const { response, error } = await request(ENV.BASE_URL + ENV.GET_TEAM_BY_ID(teamId));
	console.log("kanban", response);
	if (error) {
		alert("사용자 목록을 가져오는데 실패했습니다");
		return;
	}
	new TodoApp({ members: response.members, id: response._id, name: response.name });
};

document.addEventListener("DOMContentLoaded", init);
