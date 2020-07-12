import { BASE_URL } from '../utils/constants.js';
import { request, options } from './apiHandler.js';

const apiMember = {
  fetchMemberTodoList: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`);
  },
  fetchMemberAddTodoItem: (teamId, memberId, contents) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      options.POST({ contents }),
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
  fetchUpdateTodoItem: (teamId, memberId, itemId, contents) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      options.PUT({ contents }),
    );
  },
  fetchPriorityTodoItem: (teamId, memberId, itemId, priority) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      options.PUT({ priority }),
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
      options.PUT({originMemberId, targetMemberId, newPosition}),
    );
  },
};

export default apiMember;
