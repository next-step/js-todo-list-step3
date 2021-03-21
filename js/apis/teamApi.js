import defaultApi from './defaultApi.js';

export default {
	getTeams: async function () {
		return await defaultApi.get({path: '/api/teams'});
	}
}
