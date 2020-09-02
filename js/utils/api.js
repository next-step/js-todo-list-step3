import { BASE_URL } from "./data.js";

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response.json();
  } catch (err) {
    throw new Error(err);
  }
};

const options = {
  POST: (data) => {
    return {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  DELETE: () => {
    return {
      method: "DELETE",
    };
  },
  TOGGLE: () => {
    return {
      method: "PUT",
    };
  },
  EDIT: (text) => {
    return {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
  PRIORITY: (priority) => {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priority,
      }),
    };
  },
};
const api = {
  getTeamList: () => {
    return request(`${BASE_URL}/api/teams`);
  },
  getOneTeam: (_id) => {
    return request(`${BASE_URL}/api/teams/${_id}`);
  },
  addTeamList: (data) => {
    return request(`${BASE_URL}/api/teams`, options.POST(data));
  },
  addTeamMember: (_id, data) => {
    return request(`${BASE_URL}/api/teams/${_id}/members`, options.POST(data));
  },
  getMemberTodoList: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}`);
  },
  addMemberTodoList: (teamId, memberId, data) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      options.POST(data)
    );
  },
  deleteMemberTodo: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      options.DELETE()
    );
  },
  toggleMemberTodo: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      options.TOGGLE()
    );
  },
  editMemberTodo: (teamId, memberId, itemId, contents) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      options.EDIT(contents)
    );
  },
  setMemberTodoPriority: (teamId, memberId, itemId, priority) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      options.PRIORITY(priority)
    );
  },
  deleteMemberAllTodos: (teamId, memberId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/`,
      options.DELETE()
    );
  },
};
export default api;
