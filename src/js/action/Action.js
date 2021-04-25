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
export class Action {
  static getTeams() {
    action.getTeams();
  }
  static addTeam(teamName) {
    action.addTeam(teamName);
  }
  static getTeam(teamId) {
    action.getTeam(teamId);
  }
  static addMember(teamId, memberName) {
    action.addMember(teamId, memberName);
  }
  static addItem(teamId, memberId, data) {
    action.addItem(teamId, memberId, data);
  }
  static deleteItem(teamId, memberId, itemId) {
    action.deleteItem(teamId, memberId, itemId);
  }
  static deleteItemAll(teamId, memberId) {
    action.deleteItemAll(teamId, memberId);
  }
  static updateItemCompleteToggle(teamId, memberId, itemId) {
    action.updateItemCompleteToggle(teamId, memberId, itemId);
  }
  static updateItem(teamId, memberId, itemId, data) {
    action.updateItem(teamId, memberId, itemId, data);
  }
  static updateItemPriority(teamId, memberId, itemId, priority) {
    action.updateItemPriority(teamId, memberId, itemId, priority);
  }
  static changeFilterState(teamId, memberId, filterState) {
    action.changeFilterState(teamId, memberId, filterState);
  }
}
