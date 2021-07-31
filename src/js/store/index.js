import { Store } from '../core/Store.js';
import { teamAPI } from "../api/team.js";

export const store = new Store({
  state: {
    id: '',
    name: 'Team',
    members: [],
    teamList: [],
  },
  mutations: {
    fetchTeamList(state, teamList) {
      state.teamList = teamList;
    },

    fetchTeamId(state, id) {
      state.id = id;
    },

    fetchTeamName(state, name) {
      state.name = name;
    },

    fetchTeamTodolist(state, members) {
      state.members = members;
    }
  },
  actions: {
    FETCH_TEAM_LIST: async ({ commit }) => {
      const teamList = await teamAPI.fetchTeamList();
      commit('fetchTeamList', teamList);
    },

    FETCH_TEAM_TODOLIST: async ({ state, commit }) => {
      const { name, members } = await teamAPI.fetchTeam(state.id);
      commit('fetchTeamName', name);
      commit('fetchTeamTodolist', members);
    },
  },
});
