const baseURL = `https://js-todo-list-9ca3a.df.r.appspot.com/api/teams`;

const option = {
    post: target => ({
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(target),
    }),
    delete: {
        method: 'DELETE',
    },
    put: target => ({
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(target),
    }),
}

export const API = {
    addTeam: team => fetch(`${baseURL}`, option.post(team)),
    loadTeam: teamID => fetch(`${baseURL}/${teamID}`),
    loadTeamList: () => fetch(`${baseURL}`),
    deleteTeam: teamID => fetch(`${baseURL}/${teamID}`, option.delete),
    addMember: (teamID, member) => fetch(`${baseURL}/${teamID}/members`, option.post(member)),
    loadTodoList: (teamID, memberID) => fetch(`${baseURL}/${teamID}/members/${memberID}`),
    addTodoItem: (teamID, memberID, item) => fetch(`${baseURL}/${teamID}/members/${memberID}/items`, option.post(item)),
    deleteTodoItem: (teamID, memberID, itemID) => fetch(`${baseURL}/${teamID}/members/${memberID}/items/${itemID}`, option.delete),
    toggleTodoItem: (teamID, memberID, item) => 
        fetch(`${baseURL}/${teamID}/members/${memberID}/items/${item._id}/toggle`, option.put(item)),
    updateTodoItem: (teamID, memberID, item) => 
        fetch(`${baseURL}/${teamID}/members/${memberID}/items/${item._id}`, option.put(item)),
    updatePriority: (teamID, memberID, item) => 
        fetch(`${baseURL}/${teamID}/members/${memberID}/items/${item._id}/priority`, option.put(item)),
    deleteAllItems: (teamID, memberID) => 
        fetch(`${baseURL}/${teamID}/members/${memberID}/items/`, option.delete),
}