import { TodoActions as action } from './TodoActions.js';
export const ACTION_TYPES = {
  GET_TEAMS: 'GET_TEAMS',
  ADD_TEAM: 'ADD_TEAM',
  GET_TEAM: 'GET_TEAM',
  ADD_MEMBER: 'ADD_MEMBER',

  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_ITEM_ALL: 'DELETE_ITEM_ALL',
  UPDATE_ITEM_COMPLETE_TOGGLE: 'UPDATE_ITEM_COMPLETE_TOGGLE',
  UPDATE_ITEM: 'UPDATE_ITEM',
  UPDATE_ITEM_PRIORITY: 'UPDATE_ITEM_PRIORITY',
  CHANGE_FILTER_STATE: 'CHANGE_FILTER_STATE',
};

//interface
export const Action = {
  getTeams: () => action.getTeams(),
  addTeam: (teamName) => action.addTeam(teamName),
  getTeam: (teamId) => action.getTeam(teamId),
  addMember: (teamId, memberName) => action.addMember(teamId, memberName),
  addItem: (teamId, memberId, data) => action.addItem(teamId, memberId, data),
  deleteItem: (teamId, memberId, itemId) => action.deleteItem(teamId, memberId, itemId),
  deleteItemAll: (teamId, memberId) => action.deleteItemAll(teamId, memberId),
  updateItemCompleteToggle: (teamId, memberId, itemId) => action.updateItemCompleteToggle(teamId, memberId, itemId),
  updateItem: (teamId, memberId, itemId, data) => action.updateItem(teamId, memberId, itemId, data),
  updateItemPriority: (teamId, memberId, itemId, priority) => action.updateItemPriority(teamId, memberId, itemId, priority),
  changeFilterState: (teamId, memberId, filterState) => action.changeFilterState(teamId, memberId, filterState),
};
