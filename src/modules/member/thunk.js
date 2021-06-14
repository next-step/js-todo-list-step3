import * as teamAPI from '../../apis/team';
import * as memberAPI from '../../apis/member';
import {
  ADD_MEMBER,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  GET_MEMBERS,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
} from './action';

export const getMembers = (teamId) => async (dispatch) => {
  dispatch({ type: GET_MEMBERS });
  try {
    const team = await teamAPI.getTeamById(teamId);
    dispatch({ type: GET_MEMBERS_SUCCESS, payload: team.members });
  } catch (error) {
    dispatch({ type: GET_MEMBERS_ERROR, payload: error });
  }
};

export const addMembers = (teamId, name) => async (dispatch) => {
  dispatch({ type: ADD_MEMBER });
  try {
    const member = await memberAPI.addMember(teamId, name);
    dispatch({ type: ADD_MEMBER_SUCCESS, payload: member });
  } catch (error) {
    dispatch({ type: ADD_MEMBER_ERROR, payload: error });
  }
};
