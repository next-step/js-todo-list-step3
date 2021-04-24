const ENV = {
	BASE_URL: "https://js-todo-list-9ca3a.df.r.appspot.com/",
	USERS: "/api/users",
	USER: (userId) => `/api/users/${userId}`,
	ITEM: (userId) => `/api/users/${userId}/items/`,
	USER_ITEM: (userId, itemId) => `/api/users/${userId}/items/${itemId}`,
	ITEM_PRIORITY: (userId, itemId) => `/api/users/${userId}/items/${itemId}/priority`,
	ITEM_TOGGLE: (userId, itemId) => `/api/users/${userId}/items/${itemId}/toggle`,
	ADD_TEAM: `/api/teams`,
	GET_TEAM_BY_ID: (teamId) => `/api/teams/${teamId}`,
	GET_TEAM_LIST: `/api/teams`,
	ADD_MEMBER_TO_TEAM: (teamId) => `/api/teams/${teamId}/members`,
	GET_TODO_LIST_OF_MEMBER: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}`,
	ADD_TODO_ITEM_TO_MEMBER: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}/items`,
	DELETE_TODO_ITEM_OF_MEMBER: (teamId, memberId, itemId) =>
		`/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
	TOGGLE_TODO_ITEM_OF_MEMBER: (teamId, memberId, itemId) =>
		`/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
	UPDATE_CONTENTS: (teamId, memberId, itemId) => `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
	UPDATE_PRIORITY: (teamId, memberId, itemId) => `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
	DELETE_ALL_TODO_ITEM: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}/items/`
};

export default ENV;
