import {Store} from "../core/Store.js";
import TeamService from "../services/TeamService.js";

export const SET_TEAMS = 'SET_TEAMS';
export const FETCH_TEAMS = 'FETCH_TEAMS';

export const teamStore = new Store({

  state: {
    teams: []
  },

  mutations: {
    [SET_TEAMS] (state, teams) {
      state.teams = teams;
    }
  },

  actions: {
    async [FETCH_TEAMS] ({ commit }) {
      commit(SET_TEAMS, await TeamService.fetchTeams());
    }
  },

});