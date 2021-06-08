const BASEURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const teamPath = {
	fetchAddTeam: "/api/teams",
	fetchTeamList: "/api/teams",
	fetchLoadTeam(teamId) {
		return `/api/teams/${teamId}`;
	},
};

const kanbanPath = {
	fetchAddMember(teamId) {
		return `/api/teams/${teamId}/members`;
	},
	fetchAddTodo(teamId, memberId) {
		return `/api/teams/${teamId}/members/${memberId}/items`;
	},
	fetchDeleteTodo(teamId, memberId, itemId) {
		return `/api/teams/${teamId}/members/${memberId}/items/${itemId}`;
	},
	fetchTodoToggle(teamId, memberId, itemId) {
		return `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`;
	},
	fetchEditTodo(teamId, memberId, itemId) {
		return `/api/teams/${teamId}/members/${memberId}/items/${itemId}`;
	},
	fetchPriorityTodo(teamId, memberId, itemId) {
		return `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`;
	},
	fetchDeleteAll(teamId, memberId) {
		return `/api/teams/${teamId}/members/${memberId}/items`;
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
	fetchLoadTeam(teamId) {
		return request(teamPath.fetchLoadTeam(teamId), options.GET);
	},
};

const kanbanAPI = {
	fetchAddMember(teamId, name) {
		return request(
			kanbanPath.fetchAddMember(teamId),
			options.POST({ name })
		);
	},
	fetchAddTodo(teamId, memberId, contents) {
		return request(
			kanbanPath.fetchAddTodo(teamId, memberId),
			options.POST({ contents })
		);
	},
	fetchDeleteTodo(teamId, memberId, itemId) {
		return request(
			kanbanPath.fetchDeleteTodo(teamId, memberId, itemId),
			options.DELETE
		);
	},
	fetchTodoToggle(teamId, memberId, itemId) {
		return request(
			kanbanPath.fetchTodoToggle(teamId, memberId, itemId),
			options.PUT("")
		);
	},
	fetchEditTodo(teamId, memberId, itemId, contents) {
		return request(
			kanbanPath.fetchEditTodo(teamId, memberId, itemId),
			options.PUT({ contents })
		);
	},
	fetchPriorityTodo(teamId, memberId, itemId, priority) {
		return request(
			kanbanPath.fetchPriorityTodo(teamId, memberId, itemId),
			options.PUT({ priority })
		);
	},
	fetchDeleteAll(teamId, memberId) {
		return request(
			kanbanPath.fetchDeleteAll(teamId, memberId),
			options.DELETE
		);
	},
};

export { teamAPI, kanbanAPI };
