export default {
  setCurrentTeam : (context, payload) => {
    context.commit('setCurrentTeam', payload);
  },
  addTeam : (context, payload) => {
    context.commit('addTeam', payload);
  },
  clearTeam : (context, payload) => {
    context.commit('clearTeam', payload);
  },
}