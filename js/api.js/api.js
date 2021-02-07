const ROOT = "https://js-todo-list-9ca3a.df.r.appspot.com/";

const option = {
  post: (contents) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contents),
  }),
  delete: () => ({
    method: "DELETE",
  }),
  put: (contents = {}) => ({
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contents),
  }),
};
const request = (url, option = {}) => {
  return fetch(`${ROOT}${url}`, option)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res.json();
    })
    .catch((err) => console.error(err));
};
export const teamAPI = {
  addTeam: (name) => request(`api/teams`, option.post({ name })),
  getTeamList: () => request(`api/teams`),
  getTeam: (teamID) => request(`api/teams/${teamID}`),
  deleteTeam: (teamID) => request(`api/teams/${teamID}`, option.delete()),
};
const commonURL = "api/teams/${teamID}/members";
export const memberAPI = {
  addMember: (teamID, name) =>
    request(`api/teams/${teamID}/members`, option.post({ name })),
  getTodoList: (teamID, memberID) =>
    request(`api/teams/${teamID}/members/${memberID}`),
  addTodoItem: (teamID, memberID, contents) =>
    request(
      `api/teams/${teamID}/members/${memberID}/items`,
      option.post({ contents })
    ),
  deleteTodoItem: (teamID, memberID, itemID) =>
    request(
      `api/teams/${teamID}/members/${memberID}/items/${itemID}`,
      option.delete()
    ),
  toggleTodoItem: (teamID, memberID, itemID) =>
    request(
      `api/teams/${teamID}/members/${memberID}/items/${itemID}/toggle`,
      option.put()
    ),
  reviseContents: (teamID, memberID, itemID, contents) =>
    request(
      `api/teams/${teamID}/members/${memberID}/items/${itemID}`,
      option.put({ contents })
    ),
  revisePriority: (teamID, memberID, itemID, priority) =>
    request(
      `api/teams/${teamID}/members/${memberID}/items/${itemID}/priority`,
      option.put({ priority })
    ),
  deleteAllTodoItem: (teamID, memberID) =>
    request(`api/teams/${teamID}/members/${memberID}/items`, option.delete()),
};
