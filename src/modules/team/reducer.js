import {
  GET_TEAM,
  GET_TEAMS,
  GET_TEAMS_ERROR,
  GET_TEAMS_SUCCESS,
  GET_TEAM_ERROR,
  GET_TEAM_SUCCESS,
} from './actions';

const initialState = {
  loading: false,
  error: null,
  teams: null,
  selectedTeam: null,
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        loading: true,
      };
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action.payload,
      };
    case GET_TEAMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_TEAM:
      return {
        ...state,
        loading: true,
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedTeam: action.payload,
      };
    case GET_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
