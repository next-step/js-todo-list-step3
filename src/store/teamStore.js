import {Store} from "../core/Store.js";
import TeamService from "../services/TeamService.js";

export const SET_TEAMS = 'SET_TEAMS';
export const SET_TEAM = 'SET_TEAM';
export const SET_OPENED_APPEND_FORM = 'SET_OPENED_APPEND_FORM';
export const FETCH_TEAMS = 'FETCH_TEAMS';
export const FETCH_TEAM = 'FETCH_TEAM';
export const ADD_TEAM = 'ADD_TEAM';

export const teamStore = new Store({

  state: {
    teams: [],
    team: {
      _id: null,
      name: null,
      members: []
    },
    openedAppendForm: false,
  },

  mutations: {
    [SET_TEAMS] (state, teams) {
      state.teams = teams;
    },
    [SET_TEAM] (state, team) {
      state.team = team;
    },
    [SET_OPENED_APPEND_FORM] (state, openedAppendForm) {
      state.openedAppendForm = openedAppendForm;
    },
  },

  actions: {
    async [FETCH_TEAMS] ({ commit }) {
      commit(SET_TEAMS, await TeamService.fetchTeams());
    },
    async [FETCH_TEAM] ({ commit }, id) {
      commit(SET_TEAM, await TeamService.fetchTeam(id));
    },
    async [ADD_TEAM] ({ dispatch }, name) {
      await TeamService.addTeam(name);
      return dispatch(FETCH_TEAMS);
    },
  },

});