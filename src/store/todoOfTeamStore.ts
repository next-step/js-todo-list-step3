import {Store, observable} from "@/_core";
import {TeamService, TodoService} from "@/services";
import {FilterTypes} from "@/constants";
import {TodoItem, TodoMember, TodoTeam} from "@/domains";
import {TodoServiceVO} from "@/services/TodoService";

export const INIT = 'INIT';
export const SET_TODO_LIST = 'SET_TODO_LIST';
export const SET_EDITING = 'SET_EDITING';
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE';
export const SET_OPENED_MEMBER_APPEND_FORM = 'SET_OPENED_MEMBER_APPEND_FORM';

export const FETCH_TEAM = 'FETCH_TEAM';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_PRIORITY = 'UPDATE_ITEM_PRIORITY';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ALL_ITEM = 'DELETE_ALL_ITEM';
export const DELETE_TEAM_MEMBER = 'DELETE_TEAM_MEMBER';

interface TodoOfTeamState {
  _id: string;
  name: string;
  members: Record<string, TodoMember>;
  filterType: Record<string, FilterTypes>;
  editing: string;
  openedAppendForm: boolean;
}

export const todoOfTeamStore = new Store<TodoOfTeamState>({

  state: {
    _id: '',
    name: '',
    members: {},
    filterType: {},
    editing: '',
    openedAppendForm: false,
  },

  mutations: {
    [INIT] (state, { _id, name, members }: TodoTeam) {
      state._id = _id;
      state.name = name;
      const memberMap: Record<string, TodoMember> = {};
      const filterMap: Record<string, FilterTypes> = {};
      for (const member of members) {
        memberMap[member._id] = {
          ...member,
          todoList: (member.todoList || []).filter(v => v !== null)
        };
        filterMap[member._id] = FilterTypes.ALL;
      }
      state.members = observable(memberMap);
      state.filterType = observable(filterMap);
    },
    [SET_TODO_LIST] (state, { memberId, todoList }: { memberId: string, todoList: TodoItem[] }) {
      state.members[memberId].todoList = todoList;
    },
    [SET_EDITING] (state, editing: string) {
      state.editing = editing;
    },
    [SET_FILTER_TYPE] (state, { memberId, filterType }: { memberId: string, filterType: FilterTypes }) {
      state.filterType[memberId] = filterType;
    },
    [SET_OPENED_MEMBER_APPEND_FORM] (state, openedAppendForm: boolean) {
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
    async [FETCH_TEAM] ({ commit }, teamId) {
      commit(INIT, await TeamService.fetchTeam(teamId));
    },

    async [FETCH_TODO_LIST] ({ commit, state: { _id: teamId } }, memberId: string) {
      const { todoList } = await TodoService.fetchTodoList({ teamId, memberId });
      commit(SET_TODO_LIST, { memberId, todoList: (todoList || []).filter((v: TodoItem) => v !== null) });
    },

    async [ADD_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, contents }: TodoServiceVO) {
      await TodoService.addItem({ teamId, memberId, contents });
      return dispatch(FETCH_TODO_LIST, memberId);
    },

    async [TOGGLE_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, itemId }: TodoServiceVO) {
      await TodoService.toggleItem({ teamId, memberId, itemId });
      return dispatch(FETCH_TODO_LIST, memberId);
    },

    async [UPDATE_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, itemId, contents }: TodoServiceVO) {
      await TodoService.updateItem({ teamId, memberId, itemId, contents });
      return dispatch(FETCH_TODO_LIST, memberId);
    },

    async [UPDATE_ITEM_PRIORITY] ({ dispatch, state: { _id: teamId } }, { memberId, itemId, priority }: TodoServiceVO) {
      await TodoService.updateItemPriority({ teamId, memberId, itemId, priority });
      return dispatch(FETCH_TODO_LIST, memberId);
    },

    async [DELETE_ITEM] ({ dispatch, state: { _id: teamId } }, { memberId, itemId }: TodoServiceVO) {
      await TodoService.deleteItem({ teamId, memberId, itemId });
      return dispatch(FETCH_TODO_LIST, memberId);
    },

    async [DELETE_ALL_ITEM] ({ dispatch, state: { _id: teamId } }, memberId: string) {
      await TodoService.deleteAllItem({ teamId, memberId });
      return dispatch(FETCH_TODO_LIST, memberId);
    },

    async [ADD_TEAM_MEMBER] ({ commit, state: { _id: teamId } }, name: string) {
      return commit(INIT, await TeamService.addTeamMember(teamId, name));
    },

    async [DELETE_TEAM_MEMBER] ({ dispatch, state: { _id: teamId } }, memberId: string) {
      await TeamService.deleteTeamMember(teamId, memberId)
      return dispatch(FETCH_TEAM, teamId);
    },

  },

});
