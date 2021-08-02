const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const API = {
  TEAMS: `${baseUrl}/api/teams`,
  TEAM: taemId => `${baseUrl}/api/teams/${taemId}`,
  MEMBERS: teamId => `${baseUrl}/api/teams/${teamId}/members`,
  TODOS: (teamId, memberId) => `${baseUrl}/api/teams/${teamId}/members/${memberId}`,
  ITEMS: (teamId, memberId) => `${baseUrl}/api/teams/${teamId}/members/${memberId}/items`,
  ITEM: (teamId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  ITEM_TOGGLE: (teamId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  ITEM_PRIORITY: (teamId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`
};

export { $, $$, baseUrl, METHOD, API };