import * as types from "../actions/team/index.js";

const initialState = {
  teamList: [],
  loadError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_TEAM_SUCCESS:
      return {
        ...state,
        teamList: action.data,
      };
    case types.LOAD_TEAM_FAIL:
      const error = action.error;
      return {
        ...state,
        loadError: error,
      };
    default:
      return state;
  }
};

export default reducer;
