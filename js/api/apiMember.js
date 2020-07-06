import { BASE_URL } from '../utils/constants.js';
import { request, options } from './apiHandler.js';

const apiMember = {
  fetchMemberTodoList: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`);
  },
  fetchMemberAddTodoItem: (teamId, memberId, text) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      options.POST('contents', text),
    );
  },
  fetchDeleteTodoItem: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      options.DELETE(),
    );
  },
  fetchToggleTodoItem: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      options.TOGGLE(),
    );
  },
  fetchUpdateTodoItem: (teamId, memberId, itemId, text) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      options.PUT('contents', text),
    );
  },
  fetchPriorityTodoItem: (teamId, memberId, itemId, priority) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      options.PUT('priority', priority),
    );
  },
  fetchDeleteAllTodoItems: (teamId, memberId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      options.DELETE(),
    );
  },
  fetchDragDropTodoItem: (
    teamId,
    itemId,
    originMemberId,
    targetMemberId,
    newPosition,
  ) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/items/${itemId}/sort`,
      options.DRAGDROP_ITEM(originMemberId, targetMemberId, newPosition),
    );
  },
  fetchDragDropMember: (teamId, memberId, newPosition) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/sort`,
      options.DRAGDROP_LIST(memberId, newPosition),
    );
  },
};

export default apiMember;
