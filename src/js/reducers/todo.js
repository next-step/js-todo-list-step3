import { TYPES } from "../actions/todo.js";

const initialState = {
  teamInfo: null,
  isLoadingGetSingleTeam: false,
  getSingleTeamError: null,

  isLoadingAddUser: false,
  addUserError: null,

  isLoadingAddNewTodo: false,
  addNewTodoError: null,

  isLoadingRemoveTodo: false,
  removeTodoError: null,
};

const helpers = {
  addUser: (teamInfo, data) => {
    const length = data.members.length;
    const lastIndex = length === 0 ? length : length - 1;
    const newMember = action.data.members[lastIndex];
    const newTeamInfo = { ...teamInfo };
    newTeamInfo.members.push(newMember);
    return newTeamInfo;
  },
  addNewTodo: (teamInfo, data) => {
    const memberIndex = teamInfo.members.findIndex(
      (member) => member._id === data.memberId
    );
    const memberInfo = { ...teamInfo.members[memberIndex] };
    memberInfo.todoList.push(data);
    let newTeamInfo = { ...teamInfo };
    newTeamInfo.members[memberIndex] = memberInfo;
    return newTeamInfo;
  },
  removeTodo: (teamInfo, data) => {
    const memberIndex = teamInfo.members.findIndex(
      (member) => member._id === data.memberId
    );
    const memberInfo = { ...teamInfo.members[memberIndex] };
    memberInfo.todoList = memberInfo.todoList.filter(
      (v) => v._id !== data.itemId
    );
    let newTeamInfo = { ...teamInfo };
    newTeamInfo.members[memberIndex] = memberInfo;
    return newTeamInfo;
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_SINGLE_TEAM_REQUEST:
      return {
        ...state,
        isLoadingGetSingleTeam: true,
      };
    case TYPES.GET_SINGLE_TEAM_SUCCESS:
      return {
        ...state,
        isLoadingGetSingleTeam: false,
        teamInfo: action.data,
      };
    case TYPES.GET_SINGLE_TEAM_FAIL:
      return {
        ...state,
        isLoadingGetSingleTeam: false,
        getSingleTeamError: action.error,
      };
    case TYPES.ADD_USER_REQUEST:
      return {
        ...state,
        isLoadingAddUser: true,
      };
    case TYPES.ADD_USER_SUCCESS:
      return {
        ...state,
        isLoadingAddUser: false,
        teamInfo: helpers.addUser(state.teamInfo, action.data),
      };
    case TYPES.ADD_USER_FAIL:
      return {
        ...state,
        isLoadingAddUser: false,
        addUserError: action.error,
      };
    case TYPES.ADD_NEW_TODO_REQUEST:
      return {
        ...state,
        isLoadingAddNewTodo: true,
      };
    case TYPES.ADD_NEW_TODO_SUCCESS:
      return {
        ...state,
        isLoadingAddNewTodo: false,
        teamInfo: helpers.addNewTodo(state.teamInfo, action.data),
      };
    case TYPES.ADD_NEW_TODO_FAIL:
      return {
        ...state,
        isLoadingAddNewTodo: false,
        addNewTodoError: action.error,
      };
    case TYPES.REMOVE_TODO_REQUEST:
      return {
        ...state,
        isLoadingRemoveTodo: true,
      };
    case TYPES.REMOVE_TODO_SUCCESS:
      return {
        ...state,
        isLoadingRemoveTodo: false,
        teamInfo: helpers.removeTodo(state.teamInfo, action.data),
      };
    case TYPES.REMOVE_TODO_FAIL:
      return {
        ...state,
        isLoadingRemoveTodo: false,
        removeTodoError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
