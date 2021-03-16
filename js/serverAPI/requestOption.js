export const requestOption = {
  post: (data = {}) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  delete: () => {
    return {
      method: "DELETE",
    };
  },
  put: (data = {}) => {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
};
