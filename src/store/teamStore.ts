import {Store} from "@/core";
import {TeamService} from "@/services";
import {TodoTeam} from "@/domains";
import {todoRouter} from "@/router";

export const SET_TEAMS = 'SET_TEAMS';
export const SET_OPENED_TEAM_APPEND_FORM = 'SET_OPENED_TEAM_APPEND_FORM';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const ADD_TEAM = 'ADD_TEAM';
export const REMOVE_TEAM = 'REMOVE_TEAM';

export interface TeamState {
  teams: TodoTeam[];
  openedAppendForm: boolean;
}

export const teamStore = new Store<TeamState>({

  state: {
    teams: [],
    openedAppendForm: false,
  },

  mutations: {

    [SET_TEAMS] (state, teams: TodoTeam[]) {
      state.teams = teams;
    },

    [SET_OPENED_TEAM_APPEND_FORM] (state, openedAppendForm: boolean) {
      state.openedAppendForm = openedAppendForm;
    },

  },

  actions: {

    async [FETCH_TEAMS] ({ commit }) {
      commit(SET_TEAMS, await TeamService.fetchTeams());
    },

    async [ADD_TEAM] ({ dispatch }, name: string) {
      await TeamService.addTeam(name);
      return dispatch(FETCH_TEAMS);
    },

    async [REMOVE_TEAM] ({ dispatch }, teamId: string) {
      await TeamService.deleteTeam(teamId);
      alert('삭제되었습니다.');
      todoRouter.push('./');
    },

  },

});
