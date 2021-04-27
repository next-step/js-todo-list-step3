import { TYPES } from "../actions/team/index.js";

const initialState = {
  teamList: [],
  isLoadingTeamLoad: false,
  teamLoadError: "",
  isLoadingAddTeam: false,
  addTeamError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_TEAM_LIST_REQEUST:
      return {
        ...state,
        isLoadingTeamLoad: true,
      };
    case TYPES.GET_TEAM_LIST_SUCCESS:
      return {
        ...state,
        isLoadingTeamLoad: false,
        teamList: action.data,
      };
    case TYPES.LOAD_TEAM_FAIL:
      return {
        ...state,
        isLoadingTeamLoad: false,
        teamLoadError: action.error,
      };
    case TYPES.GET_TEAM_LIST_FAIL:
      return {
        ...state,
        isLoadingAddTeam: true,
      };
    case TYPES.ADD_TEAM_SUCCESS:
      return {
        ...state,
        isLoadingAddTeam: false,
        teamList: [...state.teamList, action.data],
      };
    case TYPES.ADD_TEAM_FAIL:
      return {
        ...state,
        addTeamError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
