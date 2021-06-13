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
  TEAM: taemId => `${baseUrl}/api/temas/${taemId}`,
  MEMBERS: teamId => `${baseUrl}/api/teams/${teamId}/members`,
  TODOS: (taemId, memberId) => `${baseUrl}/api/teams/${teamId}/members/${memberId}`,
  ITEMS: (taemId, memberId) => `${baseUrl}/api/teams/${teamId}/members/${memberId}/items`,
  ITEM: (taemId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  ITEM_TOGGLE: (taemId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  ITEM_PRIORITY: (taemId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`
};

export { $, $$, baseUrl, METHOD, API };