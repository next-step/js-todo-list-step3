const ORIGIN = 'https://js-todo-list-9ca3a.df.r.appspot.com'

const URL = {
  GET_TEAMS: () => `${ORIGIN}/api/teams`,
  POST_TEAM: () => `${ORIGIN}/api/teams`,
  GET_TEAM: (teamId) => `${ORIGIN}/api/teams/${teamId}`,
  POST_MEMBER: (teamId) => `${ORIGIN}/api/teams/${teamId}/members`,
  POST_TODO: (teamId, memberId) => `${ORIGIN}/api/teams/${teamId}/members/${memberId}/items`,
  DELETE_TODO: (teamId, memberId, itemId) => `${ORIGIN}/api/teams/${teamId}/members/${memberId}/items/${itemId}`
}

export default URL
