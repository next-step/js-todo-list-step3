import {Store} from "../core/Store.js";
import TeamService from "../services/TeamService.js";
import FilterTypes from "../constants/FilterTypes.js";

export const INIT = 'INIT';
export const FETCH_TEAM = 'FETCH_TEAM';

export const todoOfTeamStore = new Store({

  state: {
    _id: null,
    name: null,
    members: {},
    filterType: {},
  },

  mutations: {
    [INIT] (state, { _id, name, members }) {
      state._id = _id;
      state.name = name;
      for (const member of members) {
        state.members[member._id] = {
          ...member,
          todoList: member.todoList.filter(v => v !== null)
        };
        state.filterType[member._id] = FilterTypes.ALL;
      }
    }
  },

  getters: {
    membersByFilteredTodoList: ({ members, filterType }) =>
      Object.entries(members)
            .reduce((temp, [ id, { todoList } ]) => ({
              ...temp,
              [id]: todoList.filter(({ completed }) => (filterType[id] === FilterTypes.ALL) ||
                                                       (filterType[id] === FilterTypes.PRIORITY) ||
                                                       (filterType[id] === FilterTypes.COMPLETED && completed) ||
                                                       (filterType[id] === FilterTypes.ACTIVE && !completed))
            }), {}),
  },

  actions: {
    async [FETCH_TEAM] ({ commit }, id) {
      commit(INIT, await TeamService.fetchTeam(id));
    }
  },

});