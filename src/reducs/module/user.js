import { createAction } from '../../lib/reducs';
import { TeamService } from '../../services';

export const START_LOAD_USERS = 'START_LOAD_USERS';
export const LOAD_USERS = 'LOAD_USERS';
export const FAIL_LOAD_USERS = 'FAIL_LOAD_USERS';
export const START_LOAD_USER = 'START_LOAD_USER';
export const LOAD_USER = 'LOAD_USER';
export const ADD_MEMBER = 'ADD_MEMBER';
export const DELETE_MEMBER = 'DELETE_MEMBER';
export const USER_ERROR = 'USER_ERROR';

export const addMemberAsync = (teamId, name) => async dispatch => {
  try {
    const team = await TeamService.addMember(teamId, name);
    dispatch(createAction(ADD_MEMBER, team));
  } catch (error) {
    dispatch(createAction(USER_ERROR, error));
  }
};

export const deleteMemberAsync = id => dispatch => {
  try {
    TeamService.delete(id);
    dispatch(createAction(DELETE_MEMBER, id));
  } catch (error) {
    dispatch(createAction(USER_ERROR, error));
  }
};
