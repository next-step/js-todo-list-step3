const BASEURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const teamPath = {
	fetchAddTeam: "/api/teams",
	fetchTeamList: "/api/teams",
};

const kanbanPath = {
	fetchAddMember(teamId) {
		return `/api/teams/${teamId}/members`;
	},
};

const options = {
	GET: { method: "GET" },
	POST(body) {
		return {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};
	},
	DELETE: { method: "DELETE" },
	PUT(body) {
		return {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : "",
		};
	},
};

const request = (endPoint, option) => {
	const data = fetch(BASEURL + endPoint, option).then((res) => res.json());
	return data;
};

const teamAPI = {
	fetchAddTeam(name) {
		return request(teamPath.fetchAddTeam, options.POST({ name }));
	},
	fetchTeamList() {
		return request(teamPath.fetchTeamList, options.GET);
	},
};

const kanbanAPI = {
	fetchAddMember(teamId, name) {
		return request(
			kanbanAPI.fetchAddMember(teamId),
			options.POST({ name })
		);
	},
};

export { teamAPI, kanbanAPI };
