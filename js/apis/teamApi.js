import defaultApi from './defaultApi.js';

export default {
	findTeams: async function () {
		return await defaultApi.get({path: '/api/teams'});
	},

	saveTeam: async function (teamName) {
		return await defaultApi.post({
			path: '/api/teams',
			data: {
				name: teamName,
			},
		})
	},
}
