export default {
  baseURL: 'https://js-todo-list-9ca3a.df.r.appspot.com',
  userURL: '/api/users',
  teamURL: '/api/teams',
  deleteTeamURL: (id) => `/api/teams/${id}`,
  todoListURL: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}`
};