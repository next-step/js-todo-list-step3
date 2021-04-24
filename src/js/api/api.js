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
};

export const userApi = {
  get: (userId) => {
    return request(`${ENDPOINT}/api/users/${userId ? userId : ""}`, "GET");
  },

  create: (name) => {
    return request(`${ENDPOINT}/api/users/`, "POST", { name: name });
  },

  delete: (userId) => {
    return request(`${ENDPOINT}/api/users/${userId}`, "DELETE");
  },
};

export const todoApi = {
  get: (userId) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/`, "GET");
  },

  create: (userId, contents) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/`, "POST", {
      contents: contents,
    });
  },

  modify: (userId, itemId, contents) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/${itemId}`, "PUT", {
      contents: contents,
    });
  },

  toggle: (userId, itemId) => {
    return request(
      `${ENDPOINT}/api/users/${userId}/items/${itemId}/toggle/`,
      "PUT"
    );
  },

  setPriority: (userId, itemId, priority) => {
    return request(
      `${ENDPOINT}/api/users/${userId}/items/${itemId}/priority/`,
      "PUT",
      {
        priority: priority,
      }
    );
  },

  delete: (userId, itemId) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/${itemId}`, "DELETE");
  },
};
