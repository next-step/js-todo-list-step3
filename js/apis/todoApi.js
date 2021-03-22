import defaultApi from './defaultApi.js';

export default {

	getTodoItems: async function ({teamId, userId}) {
		return defaultApi.get({path: `/api/teams/${teamId}/members/${userId}`});
	},

	createTodoItem: async function ({teamId, userId, contents}) {
		return defaultApi.post({
			path: `/api/teams/${teamId}/members/${userId}/items`,
			data: {contents},
		});
	},

	toggleTodoItem: async function ({teamId, userId, todoItemId}) {
		return defaultApi.put({
			path: `/api/teams/${teamId}/members/${userId}/items/${todoItemId}/toggle`,
		});
	},

	deleteTodoItem: async function ({teamId, userId, todoItemId}) {
		return defaultApi.delete({
			path: `/api/teams/${teamId}/members/${userId}/items/${todoItemId}`,
		});
	},

	editTodoItemContents: async function ({teamId, userId, todoItemId, contents}) {
		return defaultApi.put({
			path: `/api/teams/${teamId}/members/${userId}/items/${todoItemId}`,
			data: {
				contents,
			},
		});
	},

	editTodoItemPriority: async function ({teamId, userId, todoItemId, priority}) {
		return defaultApi.put({
			path: `/api/teams/${teamId}/members/${userId}/items/${todoItemId}/priority`,
			data: {
				priority,
			},
		});
	},
};
