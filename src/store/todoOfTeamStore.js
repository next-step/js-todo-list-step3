import {Store} from "../core/Store.js";
import TeamService from "../services/TeamService.js";

export const INIT = 'INIT';
export const FETCH_TEAM = 'FETCH_TEAM';

export const todoOfTeamStore = new Store({

  state: {
    _id: null,
    name: null,
    members: [],
  },

  mutations: {
    [INIT] (state, { _id, name, members }) {
      state._id = _id;
      state.name = name;
      state.members = members;
    }
  },

  actions: {
    async [FETCH_TEAM] ({ commit }, id) {
      commit(INIT, await TeamService.fetchTeam(id));
    }
  },

});