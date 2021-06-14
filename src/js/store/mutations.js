export default {
  setCurrentTeam : (state, payload) => {
    return {
      ...state,
      teamIndex: payload.teamIndex
    };
  },
  addTeam : (state, payload) => {
    return {
      ...state,
      teams: [...state.teams, ...payload]
    };
  },
  addTodoItem : (state, payload) => {
    const { todoItem, memberIndex } = payload;
    const { teams, teamIndex } = state;
    const newTodoList = [...teams[teamIndex].members[memberIndex].todoList, todoItem];
    teams[teamIndex].members[memberIndex].todoList = [...newTodoList];
    return {
      ...state,
      teams: [...teams]
    };
  },
  modifyTodoItem : (state, payload) => {
    const { memberIndex , itemIndex, todoItem } = payload;
    const { teams, teamIndex } = state;
    const newTodoList = [...teams[teamIndex].members[memberIndex].todoList];
    newTodoList[itemIndex] = todoItem;
    teams[teamIndex].members[memberIndex].todoList = newTodoList;
    return {
      ...state,
      teams: [...teams]
    };
  },
  addMember : (state, payload) => {
    const { teams, teamIndex } = state;
    teams[teamIndex] = payload;
    return {
      ...state,
      teams: [...teams]
    };
  },
  clearTodoItem : (state, payload) => {
    const { memberIndex, itemIndex } = payload;
    const { teams, teamIndex } = state;
    const newTodoList = [...teams[teamIndex].members[memberIndex].todoList];
    newTodoList.splice(itemIndex, 1);
    teams[teamIndex].members[memberIndex].todoList = newTodoList;
    return {
      ...state,
      teams: [...teams]
    }
  },
  clearTodoList : (state, payload) => {
    const { memberIndex } = payload;
    const { teams, teamIndex } = state;
    teams[teamIndex].members[memberIndex].todoList = [];
    return {
      ...state,
      teams: [...teams]
    };
  },
  clearTeam : (state, payload) => {
    const newState = { ...state };
    newState.teams.splice(payload.index, 1);
    return newState;
  },
  changeFilter : (state, payload) => {
    const { memberIndex, members } = payload;
    const { teams, teamIndex } = state;
    teams[teamIndex].members = [...members];
    return {
      ...state,
      teams: [...teams]
    }
  }
}