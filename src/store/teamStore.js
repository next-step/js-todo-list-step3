import {Store} from "../core/Store.js";
import TeamService from "../services/TeamService.js";

export const SET_TEAMS = 'SET_TEAMS';
export const SET_OPENED_APPEND_FORM = 'SET_OPENED_APPEND_FORM';
export const FETCH_TEAMS = 'FETCH_TEAMS';

export const teamStore = new Store({

  state: {
    teams: [],
    openedAppendForm: false,
  },

  mutations: {
    [SET_TEAMS] (state, teams) {
      state.teams = teams;
    },
    [SET_OPENED_APPEND_FORM] (state, openedAppendForm) {
      state.openedAppendForm = openedAppendForm;
    },
  },

  actions: {
    async [FETCH_TEAMS] ({ commit }) {
      commit(SET_TEAMS, await TeamService.fetchTeams());
    }
  },

});