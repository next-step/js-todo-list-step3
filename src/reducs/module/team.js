import produce from 'immer';
import { createAction } from '../../lib/reducs';
import { TeamService } from '../../services';
import {
  ADD_TODO,
  DELETE_ALL_TOODS_AND_MEMBER,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_PRIORITY,
  START_EDIT_TODO,
  CANCEL_EDIT,
  CONFIRM_EDIT,
  CHANGE_MODE,
} from './todo';
import { ADD_MEMBER, DELETE_MEMBER } from './user';
import { FILTER_STATUS } from 'utils';

const START_LOAD_TEAMS = 'START_LOAD_TEAMS';
const LOAD_TEAMS = 'LOAD_TEAMS';
const FAIL_LOAD_TEAMS = 'FAIL_LOAD_TEAMS';

const START_LOAD_TEAM = 'START_LOAD_TEAM';
const LOAD_TEAM = 'LOAD_TEAM';
const FAIL_LOAD_TEAM = 'FAIL_LOAD_TEAM';

const ADD_TEAM = 'ADD_TEAM';
const DELETE_TEAM = 'DELETE_TEAM';
const ERROR = 'ERROR';

const initialState = {
  isTeamLoading: false,
  isTeamsLoading: false,
  teams: [],
  selectedTeam: null,
  editingId: null,
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

    case ADD_MEMBER:
      return produce(state, draft => {
        draft.selectedTeam = action.payload;
      });

    case DELETE_MEMBER:
      return produce(state, draft => {
        const id = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);
        members.splice(index, 1);
      });

    case ADD_TODO:
      return produce(state, draft => {
        const { id } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        if (members[index].todoList)
          members[index].todoList.push(action.payload.contents);
        else members[index].todoList = [action.payload.contents];
      });

    case TOGGLE_TODO:
      return produce(state, draft => {
        const { id, target, toggledTodo } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        members[index].todoList = members[index].todoList.map(todo =>
          todo._id === target ? toggledTodo : todo
        );
      });

    case DELETE_TODO:
      return produce(state, draft => {
        const { id, target } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        members[index].todoList = members[index].todoList.filter(
          todo => todo._id !== target
        );
      });

    case DELETE_ALL_TOODS_AND_MEMBER:
      return produce(state, draft => {
        const { id } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        members.splice(index, 1);
      });

    case SET_PRIORITY:
      return produce(state, draft => {
        const { id, target, newTodo } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        members[index].todoList = members[index].todoList.map(todo =>
          todo._id === target ? newTodo : todo
        );
      });

    case START_EDIT_TODO:
      return { ...state, editingId: action.payload };

    case CANCEL_EDIT:
      return {
        ...state,
        editingId: null,
      };

    case CONFIRM_EDIT:
      return produce(state, draft => {
        const { id, target, updatedTodo } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        members[index].todoList = members[index].todoList.map(todo =>
          todo._id === target ? updatedTodo : todo
        );

        draft.editingId = null;
      });

    case CHANGE_MODE:
      return produce(state, draft => {
        const { id, mode } = action.payload;
        const members = draft.selectedTeam.members;
        const index = members.findIndex(({ _id }) => _id === id);

        members[index].mode = mode;
      });

    case ERROR:
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
    selectedTeam.members?.forEach(member => (member.mode = FILTER_STATUS.ALL));
    dispatch(createAction(LOAD_TEAM, selectedTeam));
  } catch (error) {
    dispatch(createAction(FAIL_LOAD_TEAM, error));
  }
};

export const addTeamAsync = name => async (dispatch, getState) => {
  try {
    const newTeam = await TeamService.add({ name });
    dispatch(createAction(ADD_TEAM, newTeam));
  } catch (error) {
    dispatch(createAction(ERROR, error));
  }
};

export const deleteTeamsAsync = id => async (dispatch, getState) => {
  try {
    await TeamService.delete(id);
    dispatch(createAction(DELETE_TEAM));
  } catch (error) {
    dispatch(createAction(ERROR, error));
  }
};

export const loadTeam = selectedTeam => {
  return createAction(LOAD_TEAM, selectedTeam);
};

export default teamReducer;
