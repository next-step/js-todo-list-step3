import { createAction } from '../../lib/reducs';
import { TeamService } from '../../services';
import { LOAD_USERS } from './user';

const START_LOAD_TEAMS = 'START_LOAD_TEAMS';
const LOAD_TEAMS = 'LOAD_TEAMS';
const FAIL_LOAD_TEAMS = 'FAIL_LOAD_TEAMS';

const START_LOAD_TEAM = 'START_LOAD_TEAM';
const LOAD_TEAM = 'LOAD_TEAM';
const FAIL_LOAD_TEAM = 'FAIL_LOAD_TEAM';

const ADD_TEAM = 'ADD_TEAM';
const DELETE_TEAM = 'DELETE_TEAM';
const TEAM_ERROR = 'TEAM_ERROR';

const initialState = {
  isTeamLoading: false,
  isTeamsLoading: false,
  teams: [],
  selectedTeam: null,
  error: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOAD_TEAMS:
      return { ...state, isTeamsLoading: true };
    case LOAD_TEAMS:
      return { ...state, isTeamsLoading: false, teams: action.payload };
    case FAIL_LOAD_TEAMS:
      return { ...state, isTeamsLoading: false, error: action.payload };
    case START_LOAD_TEAM:
      return { ...state, isTeamLoading: true };
    case LOAD_TEAM:
      return { ...state, isTeamLoading: false, selectedTeam: action.payload };
    case FAIL_LOAD_TEAM:
      return { ...state, isTeamLoading: false, error: action.payload };
    case ADD_TEAM:
      return { ...state, teams: [...state.teams, action.payload] };
    case DELETE_TEAM:
      return {
        ...state,
        teams: state.teams.filter(({ _id }) => _id !== action.payload),
      };
    case TEAM_ERROR:
      return { ...state, error: state.payload };
    default:
      return state;
  }
};

export const fetchTeamsAsync = () => async (dispatch, getState) => {
  dispatch(createAction(START_LOAD_TEAMS));
  try {
    const teams = await TeamService.fetchTeams();
    dispatch(createAction(LOAD_TEAMS, teams));
  } catch (error) {
    dispatch(createAction(FAIL_LOAD_TEAMS, error));
  }
};

export const fetchTeamAsync = id => async (dispatch, getState) => {
  dispatch(createAction(START_LOAD_TEAM));
  try {
    const selectedTeam = await TeamService.fetchTeam(id);
    dispatch(createAction(LOAD_TEAM, selectedTeam));
    console.log(`%cTeam ${JSON.stringify(selectedTeam)}`, 'color:yellow');
  } catch (error) {
    dispatch(createAction(FAIL_LOAD_TEAM, error));
  }
};

export const createTeamAsync = () => (dispatch, getState) => {};

export const deleteTeamsAsync = () => (dispatch, getState) => {};

export default teamReducer;
