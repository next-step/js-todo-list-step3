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
  modifyTodoItem : (context, payload) => {
    context.commit('modifyTodoItem', payload);
  },
  addMember : (context, payload) => {
    context.commit('addMember', payload);
  },
  clearTodoItem : (context, payload) => {
    context.commit('clearTodoItem', payload);
  },
  clearTodoList : (context, payload) => {
    context.commit('clearTodoList', payload);
  },
  clearTeam : (context, payload) => {
    context.commit('clearTeam', payload);
  },
  changeFilter : (context, payload) => {
    context.commit('changeFilter', payload);
  }
}