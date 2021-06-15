import * as teamAPI from '@/apis/team';
import {
  ADD_TEAM,
  ADD_TEAM_ERROR,
  ADD_TEAM_SUCCESS,
  GET_TEAM,
  GET_TEAMS,
  GET_TEAMS_ERROR,
  GET_TEAMS_SUCCESS,
  GET_TEAM_ERROR,
  GET_TEAM_SUCCESS,
} from './actions';

export const getTeams = () => async (dispatch) => {
  dispatch({ type: GET_TEAMS });
  try {
    const teams = await teamAPI.getTeams();
    dispatch({ type: GET_TEAMS_SUCCESS, payload: teams });
  } catch (error) {
    dispatch({ type: GET_TEAMS_ERROR, payload: error });
  }
};

export const getTeam = (teamId) => async (dispatch) => {
  dispatch({ type: GET_TEAM });
  try {
    const team = await teamAPI.getTeamById(teamId);
    dispatch({ type: GET_TEAM_SUCCESS, payload: team });
  } catch (error) {
    dispatch({ type: GET_TEAM_ERROR, payload: error });
  }
};

export const addTeam = (name) => async (dispatch) => {
  dispatch({ type: ADD_TEAM });
  try {
    const team = await teamAPI.addTeam(name);
    dispatch({ type: ADD_TEAM_SUCCESS, payload: team });
  } catch (error) {
    dispatch({ type: ADD_TEAM_ERROR, payload: error });
  }
};
