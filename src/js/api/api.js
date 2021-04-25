const ENDPOINT = "https://js-todo-list-9ca3a.df.r.appspot.com";

const request = async (url, method, bodyData) => {
  try {
    const result = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bodyData),
    });
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};

export const teamApi = {
  get: (teamId) => {
    return request(`${ENDPOINT}/api/teams/${teamId ? teamId : ""}`, "GET");
  },

  create: (name) => {
    return request(`${ENDPOINT}/api/teams/`, "POST", { name: name });
  },
};

export const userApi = {
  get: (teamId, memberId) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId ? memberId : ""}`,
      "GET"
    );
  },

  create: (teamId, name) => {
    return request(`${ENDPOINT}/api/teams/${teamId}/members/`, "POST", {
      name: name,
    });
  },

  delete: (teamId, memberId) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}`,
      "DELETE"
    );
  },
};

export const todoApi = {
  get: (teamId, memberId) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}`,
      "GET"
    );
  },

  create: (teamId, memberId, contents) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}/items/`,
      "POST",
      {
        contents: contents,
      }
    );
  },

  modify: (teamId, memberId, itemId, contents) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      "PUT",
      {
        contents: contents,
      }
    );
  },

  toggle: (teamId, memberId, itemId) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle/`,
      "PUT"
    );
  },

  setPriority: (teamId, memberId, itemId, priority) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority/`,
      "PUT",
      {
        priority: priority,
      }
    );
  },

  delete: (teamId, memberId, itemId) => {
    return request(
      `${ENDPOINT}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      "DELETE"
    );
  },
};
