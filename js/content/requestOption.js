export const requestOption = {
  addMember: (teamName) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${teamName}`,
      }),
    };
  },
  delete: () => {
    return {
      method: "DELETE",
    };
  },
  completed: (IsCompleted) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isCompleted: `${IsCompleted}`,
      }),
    };
  },

  addMemberItem: (value) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: `${value}`,
      }),
    };
  },
  contentsModify: (value) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: `${value}`,
      }),
    };
  },
};
