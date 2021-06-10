export default {
  addTeam : (state, payload) => {
    return {
      ...state,
      teams: [...state.teams, ...payload]
    };
  },
  clearTeam : (state, payload) => {
    const newState = { ...state };
    newState.teams.splice(payload.index, 1);
    return newState;
  }
}