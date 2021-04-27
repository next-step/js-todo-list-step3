import { TYPES } from "../actions/todo.js";

const initialState = {
  teamInfo: null,
  isLoadingGetSingleTeam: false,
  getSingleTeamError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_SINGLE_TEAM_REQUEST:
      return {
        ...state,
        isLoadingGetSingleTeam: true,
      };
    case TYPES.GET_SINGLE_TEAM_SUCCESS:
      console.log(action.data);
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
    default:
      return state;
  }
};

export default reducer;
