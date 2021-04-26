import { TYPES } from "../actions/team/index.js";

const initialState = {
  teamList: [],
  isLoadingTeamLoad: false,
  teamLoadError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOAD_TEAM_REQEUST:
      return {
        ...state,
        isLoadingTeamLoad: true,
      };
    case TYPES.LOAD_TEAM_SUCCESS:
      return {
        ...state,
        isLoadingTeamLoad: false,
        teamList: action.data,
      };
    case TYPES.LOAD_TEAM_FAIL:
      const error = action.error;
      return {
        ...state,
        isLoadingTeamLoad: false,
        teamLoadError: error,
      };
    default:
      return state;
  }
};

export default reducer;
