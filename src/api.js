const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = {
  post: (data) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (data) => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
};

const request = async (url, option = {}) => {
  try {
    const response = await fetch(url, option);

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const api = {
  addTeam: (teamName) => {
    return request(`${BASE_URL}/api/teams`, option.post(teamName));
  },

  getTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`);
  },

  getTeamList: () => {
    return request(`${BASE_URL}/api/teams`);
  },

  deleteTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`, option.delete());
  },

  addMember: (teamId, memberName) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members`, option.post(memberName));
  },

  getTodo: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`);
  },

  addTodo: (teamId, memberId, contents) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      option.post(contents)
    );
  },

  deleteTodo: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.delete()
    );
  },

  toggleTodo: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      option.put()
    );
  },

  editTodo: (teamId, memberId, itemId, contents) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.put(contents)
    );
  },

  setPriority: (teamId, memberId, itemId, contents) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      option.put(contents)
    );
  },

  deleteAllTodo: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`, option.delete());
  },
};
