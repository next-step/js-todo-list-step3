import * as Ajax from '../util/ajaxUtil.js';
const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const APIs = {
  getTeams: () => `${BASE_URL}/api/teams/`,
  getTeam: (teamId) => `${BASE_URL}/api/teams/${teamId}`,
  getMembers: (teamId) => `${BASE_URL}/api/teams/${teamId}/members`,

  getTodoList: (teamId, memberId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}`,
  getItems: (teamId, memberId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
  getItem: (teamId, memberId, itemId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  updateItem: (teamId, memberId, itemId, updateAction) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/${updateAction}`,
};
export const RESTDataBase = {
  getTeams: async () => {
    const url = APIs.getTeams();
    return await Ajax.get(url, 'Team List 로드 실패');
  },
  addTeam: async (teamName) => {
    const url = APIs.getTeams();
    return await Ajax.post(url, { name: teamName }, 'Team Add 실패');
  },
  getTeam: async (teamId) => {
    const url = APIs.getTeam(teamId);
    return await Ajax.get(url, 'Team 정보 로드 실패');
  },
  addMember: async (teamId, memberName) => {
    const url = APIs.getMembers(teamId);
    return await Ajax.post(url, { name: memberName }, 'Member Add 실패');
  },
  getMemberTodoList: async (teamId, memberId) => {
    const url = APIs.getTodoList(teamId, memberId);
    return await Ajax.get(url, 'Member TodoList 로드 실패');
  },
  addItem: async (teamId, memberId, data) => {
    const url = APIs.getItems(teamId, memberId);
    return await Ajax.post(url, { contents: data }, 'Add Item 실패');
  },
  deleteItem: async (teamId, memberId, itemId) => {
    const url = APIs.getItem(teamId, memberId, itemId);
    return await Ajax.deleteRequest(url, 'Delete Item 실패');
  },
  deleteItemAll: async (teamId, memberId) => {
    const url = APIs.getItems(teamId, memberId);
    return await Ajax.deleteRequest(url, 'Delete All Item 실패');
  },
  updateItemCompleteToggle: async (teamId, memberId, itemId) => {
    const url = APIs.updateItem(teamId, memberId, itemId, 'toggle');
    const options = {
      errMsg: 'Update Item Complete Toggle 실패',
    };
    return await Ajax.put(url, options);
  },
  updateItem: async (teamId, memberId, itemId, data) => {
    const url = APIs.getItem(teamId, memberId, itemId);
    const options = {
      data: { contents: data },
      errMsg: 'Update Item 실패',
    };
    return await Ajax.put(url, options);
  },
  updateItemPriority: async (teamId, memberId, itemId, priority) => {
    const url = APIs.updateItem(teamId, memberId, itemId, 'priority');
    const options = {
      data: { priority: priority },
      errMsg: 'Update Item Priority 실패',
    };
    return await Ajax.put(url, options);
  },
};
