export default {
  addTeam : (context, payload) => {
    context.commit('addTeam', payload);
  },
  clearTeam : (context, payload) => {
    context.commit('clearTeam', payload);
  }
}