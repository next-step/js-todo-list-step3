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
    loadTeam: team => fetch(`${baseURL}/${team._id}`),
    loadTeamList: () => fetch(`${baseURL}`),
    deleteTeam: team => fetch(`${baseURL}/${team._id}`, option.delete),
    deleteAllTeams: () => fetch(`${baseURL}`, option.delete),
    addMember: (team, member) => fetch(`${baseURL}/${team._id}/members`, option.post(member)),
    loadTodoListOfMember: (team, member) => fetch(`${baseURL}/${team._id}/members/${member._id}`),
    addTodoItem: (team, member, item) => fetch(`${baseURL}/${team._id}/members/${member._id}/items`, option.post(item)),
    deleteTodoItem: (team, member, item) => fetch(`${baseURL}/${team._id}/members/${member._id}/items/${item._id}`, option.delete),
    toggleTodoItem: (team, member, item) => 
        fetch(`${baseURL}/${team._id}/members/${member._id}/items/${item._id}/toggle`, option.put(item)),
    updateTodoItem: (team, member, item) => 
        fetch(`${baseURL}/${team._id}/members/${member._id}/items/${item._id}`, option.put(item)),
    updatePriorityOfTodoItem: (team, member, item) => 
        fetch(`${baseURL}/${team._id}/members/${member._id}/items/${item._id}/priority`, option.put(item)),
    deleteAllItems: (team, member) => 
        fetch(`${baseURL}/${team._id}/members/${member._id}/items/`, option.delete),
}