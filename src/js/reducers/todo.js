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

  isLoadingToggleTodo: false,
  toggleTodoError: null,

  isLoadingUpdateTodo: false,
  updateTodoError: null,

  isLoadingSetPriority: false,
  setPriorityError: null,
};

const immerMemberInfo = (teamInfo, memberId) => {
  const memberIndex = teamInfo.members.findIndex(
    (member) => member._id === memberId
  );
  const memberInfo = { ...teamInfo.members[memberIndex] };
  return { memberIndex, memberInfo };
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
    const { memberIndex, memberInfo } = immerMemberInfo(
      teamInfo,
      data.memberId
    );
    memberInfo.todoList.push(data);
    let newTeamInfo = { ...teamInfo };
    newTeamInfo.members[memberIndex] = memberInfo;
    return newTeamInfo;
  },
  removeTodo: (teamInfo, { memberId, itemId }) => {
    const { memberIndex, memberInfo } = immerMemberInfo(teamInfo, memberId);
    memberInfo.todoList = memberInfo.todoList.filter((v) => v._id !== itemId);
    let newTeamInfo = { ...teamInfo };
    newTeamInfo.members[memberIndex] = memberInfo;
    return newTeamInfo;
  },
  toggleTodo: (teamInfo, { memberId, itemId }) => {
    const { memberIndex, memberInfo } = immerMemberInfo(teamInfo, memberId);
    memberInfo.todoList = memberInfo.todoList.map((v, i) => {
      if (v._id === itemId) {
        return { ...v, isCompleted: !v.isCompleted };
      }
      return v;
    });
    let newTeamInfo = { ...teamInfo };
    newTeamInfo.members[memberIndex] = memberInfo;
    return newTeamInfo;
  },
  updateTodo: (teamInfo, { memberId, itemId, newData }) => {
    const { memberIndex, memberInfo } = immerMemberInfo(teamInfo, memberId);
    memberInfo.todoList = memberInfo.todoList.map((v, i) => {
      if (v._id === itemId) {
        return newData;
      }
      return v;
    });
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
    case TYPES.TOGGLE_TODO_REQUEST:
      return {
        ...state,
        isLoadingToggleTodo: true,
      };
    case TYPES.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        isLoadingToggleTodo: false,
        teamInfo: helpers.toggleTodo(state.teamInfo, action.data),
      };
    case TYPES.TOGGLE_TODO_FAIL:
      return {
        ...state,
        isLoadingToggleTodo: false,
        toggleTodoError: action.error,
      };
    case TYPES.UPDATE_TODO_REQUEST:
      return {
        ...state,
        isLoadingUpdateTodo: true,
      };
    case TYPES.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        isLoadingUpdateTodo: false,
        teamInfo: helpers.updateTodo(state.teamInfo, action.data),
      };
    case TYPES.UPDATE_TODO_FAIL:
      return {
        ...state,
        isLoadingUpdateTodo: false,
        updateTodoError: action.error,
      };
    case TYPES.SET_PRIORITY_REQUEST:
      return {
        ...state,
        isLoadingSetPriority: true,
      };
    case TYPES.SET_PRIORITY_SUCCESS:
      return {
        ...state,
        isLoadingSetPriority: false,
        teamInfo: helpers.updateTodo(state.teamInfo, action.data),
      };
    case TYPES.SET_PRIORITY_FAIL:
      return {
        ...state,
        isLoadingSetPriority: false,
        setPriorityError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
