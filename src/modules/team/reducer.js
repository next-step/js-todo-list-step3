import { ADD_MEMBER_SUCCESS } from '../member/action';
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

    case ADD_TEAM:
      return {
        ...state,
        loading: true,
      };
    case ADD_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: [...state.teams, action.payload],
      };
    case ADD_TEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        selectedTeam: { ...state.selectedTeam, members: action.payload },
      };

    default:
      return state;
  }
}
