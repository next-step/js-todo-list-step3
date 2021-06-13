export default {
  setCurrentTeam : (context, payload) => {
    context.commit('setCurrentTeam', payload);
  },
  addTeam : (context, payload) => {
    context.commit('addTeam', payload);
  },
  addTodoItem : (context, payload) => {
    context.commit('addTodoItem', payload);
  },
  clearTodoItem : (context, payload) => {
    context.commit('clearTodoItem', payload);
  },
  clearTeam : (context, payload) => {
    context.commit('clearTeam', payload);
  },
}