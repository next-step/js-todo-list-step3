import { BASE_URL } from '../utils/constants.js';
import { request } from './apiHandler.js';

const options = {
  POST: (contents) => {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    };
  },
  DELETE: () => {
    return { method: 'DELETE' };
  },
  TOGGLE: () => {
    return { method: 'PUT' };
  },
  PRIORITY: (priority) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priority }),
    };
  },
  PUT: (contents) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    };
  },
  DRAGDROP_ITEM: (originMemberId, targetMemberId, newPosition) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originMemberId,
        targetMemberId,
        newPosition,
      }),
    };
  },
  DRAGDROP_LIST: (memberId, newPosition) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberId,
        newPosition,
      }),
    };
  },
};

const apiMember = {
  fetchMemberTodoList: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`);
  },
  fetchMemberAddTodoItem: (teamId, memberId, text) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      options.POST(text),
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
      options.PUT(text),
    );
  },
  fetchPriorityTodoItem: (teamId, memberId, itemId, priority) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      options.PRIORITY(priority),
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
  fetchDragDropMember: (teamId, itemId, memberId, newPosition) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/items/${itemId}/sort`,
      options.DRAGDROP_LIST(memberId, newPosition),
    );
  },
};

export default apiMember;
