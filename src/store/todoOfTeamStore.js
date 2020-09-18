import {Store} from "../core";
import TeamService from "../services/TeamService";
import { FilterTypes } from "../constants";
import TodoService from "../services/TodoService";

export const INIT = 'INIT';
export const SET_TODO_LIST = 'SET_TODO_LIST';
export const SET_EDITING = 'SET_EDITING';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const SET_OPENED_APPEND_FORM = 'SET_OPENED_APPEND_FORM';

export const FETCH_TEAM = 'FETCH_TEAM';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_PRIORITY = 'UPDATE_ITEM_PRIORITY';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ALL_ITEM = 'DELETE_ALL_ITEM';

export const todoOfTeamStore = new Store({

  state: {
    _id: null,
    name: null,
    members: {},
    filterType: {},
    editing: null,
    openedAppendForm: false,
  },

  mutations: {
    [INIT] (state, { _id, name, members }) {
      state._id = _id;
      state.name = name;
      for (const member of members) {
        state.members[member._id] = {
          ...member,
          todoList: (member.todoList || []).filter(v => v !== null)
        };
        state.filterType[member._id] = FilterTypes.ALL;
      }
    },
    [SET_TODO_LIST] (state, { memberId, todoList }) {
      state.members[memberId].todoList = todoList;
    },
    [SET_EDITING] (state, editing) {
      state.editing = editing;
    },
    [SET_FILTER_TYPE] (state, { memberId, filterType }) {
      state.filterType[memberId] = filterType;
    },
    [SET_OPENED_APPEND_FORM] (state, openedAppendForm) {
      state.openedAppendForm = openedAppendForm;
    },
  },

  getters: {
    membersByFilteredTodoList: ({ members, filterType }) =>
      Object.entries(members)
            .reduce((temp, [ id, { todoList } ]) => ({
              ...temp,
              [id]: todoList.filter(({ isCompleted }) => (filterType[id] === FilterTypes.ALL) ||
                                                         (filterType[id] === FilterTypes.PRIORITY) ||
                                                         (filterType[id] === FilterTypes.COMPLETED && isCompleted) ||
                                                         (filterType[id] === FilterTypes.ACTIVE && !isCompleted))
            }), {}),
  },

  actions: {
    async [FETCH_TEAM] ({ commit }, id) {
      commit(INIT, await TeamService.fetchTeam(id));
    },
    async [FETCH_TODO_LIST] ({ commit, state: { _id: teamId } }, memberId) {
      const { todoList } = await TodoService.fetchTodoList({ teamId, memberId });
      commit(SET_TODO_LIST, { memberId, todoList: (todoList || []).filter(v => v !== null) });
    },
    async [ADD_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, contents }) {
      await TodoService.addItem({ teamId, memberId, contents });
      dispatch(FETCH_TODO_LIST, memberId);
    },
    async [TOGGLE_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, itemId }) {
      await TodoService.toggleItem({ teamId, memberId, itemId });
      dispatch(FETCH_TODO_LIST, memberId);
    },
    async [UPDATE_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, itemId, contents }) {
      await TodoService.updateItem({ teamId, memberId, itemId, contents });
      dispatch(FETCH_TODO_LIST, memberId);
    },
    async [UPDATE_ITEM_PRIORITY] ({ dispatch, state: { _id: teamId } }, { memberId, itemId, priority }) {
      await TodoService.updateItemPriority({ teamId, memberId, itemId, priority });
      dispatch(FETCH_TODO_LIST, memberId);
    },
    async [DELETE_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, itemId }) {
      await TodoService.deleteItem({ teamId, memberId, itemId });
      dispatch(FETCH_TODO_LIST, memberId);
    },
    async [DELETE_ALL_ITEM] ({ dispatch, state: { _id: teamId } }, memberId) {
      await TodoService.deleteAllItem({ teamId, memberId });
      dispatch(FETCH_TODO_LIST, memberId);
    },
    async [ADD_TEAM_MEMBER] ({ commit, state: { _id: teamId } }, name) {
      return commit(INIT, await TeamService.addTeamMember({ teamId, name }));
    },
  },

});