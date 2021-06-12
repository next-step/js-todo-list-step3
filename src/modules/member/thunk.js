import * as teamAPI from '../../apis/team';
import { GET_MEMBERS, GET_MEMBERS_ERROR, GET_MEMBERS_SUCCESS } from './action';

export const getMembers = (teamId) => async (dispatch) => {
  dispatch({ type: GET_MEMBERS });
  try {
    const team = await teamAPI.getTeamById(teamId);
    dispatch({ type: GET_MEMBERS_SUCCESS, payload: team.members });
  } catch (error) {
    dispatch({ type: GET_MEMBERS_ERROR, payload: error });
  }
};
