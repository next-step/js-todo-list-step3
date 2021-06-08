const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/'

const Method = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
})

const HttpEndpoint = {
  teams: () => '/api/teams',
  team: (teamId) => `/api/teams/${teamId}`,
  members: (teamId) => `/api/teams/${teamId}/members`,
  todos: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}`,
  items: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}/items`,
  item: (teamId, memberId, itemId) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  toggleItem: (teamId, memberId, itemId) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  priorityItem: (teamId, memberId, itemId) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
}

export { baseURL, Method, HttpEndpoint }
