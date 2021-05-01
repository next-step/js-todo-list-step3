import { todoDispatcher } from '../dispatcher/TodoDispatcher.js';
import { ACTION_TYPES } from './Action.js';
export const TodoActions = {
  getTeams: () => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.GET_TEAMS,
    });
  },

  addTeam: (teamName) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.ADD_TEAM,
      teamName: teamName,
    });
  },

  getTeam: (teamId) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.GET_TEAM,
      teamId: teamId,
    });
  },

  addMember: (teamId, memberName) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.ADD_MEMBER,
      teamId: teamId,
      memberName: memberName,
    });
  },
  addItem: (teamId, memberId, data) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.ADD_ITEM,
      teamId: teamId,
      memberId: memberId,
      data: data,
    });
  },

  deleteItem: (teamId, memberId, itemId) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.DELETE_ITEM,
      teamId: teamId,
      memberId: memberId,
      itemId: itemId,
    });
  },

  deleteItemAll: (teamId, memberId) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.DELETE_ITEM_ALL,
      teamId: teamId,
      memberId: memberId,
    });
  },

  updateItemCompleteToggle: (teamId, memberId, itemId) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.UPDATE_ITEM_COMPLETE_TOGGLE,
      teamId: teamId,
      memberId: memberId,
      itemId: itemId,
    });
  },
  updateItem: (teamId, memberId, itemId, data) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.UPDATE_ITEM,
      teamId: teamId,
      memberId: memberId,
      itemId: itemId,
      data: data,
    });
  },
  updateItemPriority: (teamId, memberId, itemId, priority) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.UPDATE_ITEM_PRIORITY,
      teamId: teamId,
      memberId: memberId,
      itemId: itemId,
      priority: priority,
    });
  },

  changeFilterState: (teamId, memberId, filterState) => {
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.CHANGE_FILTER_STATE,
      teamId: teamId,
      memberId: memberId,
      filterState: filterState,
    });
  },
};
