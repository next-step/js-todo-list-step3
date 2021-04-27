import { TYPES } from "../actions/todo.js";

const initialState = {
  teamInfo: null,
  isLoadingGetSingleTeam: false,
  getSingleTeamError: null,
  isLoadingAddUser: false,
  addUserError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_SINGLE_TEAM_REQUEST:
      return {
        ...state,
        isLoadingGetSingleTeam: true,
      };
    case TYPES.GET_SINGLE_TEAM_SUCCESS:
      return {
        ...state,
        isLoadingGetSingleTeam: false,
        teamInfo: action.data,
      };
    case TYPES.GET_SINGLE_TEAM_FAIL:
      return {
        ...state,
        isLoadingGetSingleTeam: false,
        getSingleTeamError: action.error,
      };
    case TYPES.ADD_USER_REQUEST:
      return {
        ...state,
        isLoadingAddUser: true,
      };
    case TYPES.ADD_USER_SUCCESS:
      const length = action.data.members.length;
      const lastIndex = length === 0 ? length : length - 1;
      const newMember = action.data.members[lastIndex];
      const newTeamInfo = { ...state.teamInfo };
      newTeamInfo.members.push(newMember);
      return {
        ...state,
        isLoadingAddUser: false,
        teamInfo: newTeamInfo,
      };
    case TYPES.ADD_USER_FAIL:
      return {
        ...state,
        isLoadingAddUser: false,
        addUserError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
