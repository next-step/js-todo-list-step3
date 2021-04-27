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
      return {
        ...state,
        isLoadingTeamLoad: false,
        teamLoadError: action.error,
      };
    case TYPES.ADD_TEAM_REQUEST:
      return {
        ...state,
        isLoadingAddTeam: true,
      };
    case TYPES.ADD_TEAM_SUCCESS:
      console.log([...state.teamList, action.data]);
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
