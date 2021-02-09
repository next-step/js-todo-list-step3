export const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const option = {
    post : (contents) => ({
        method : 'POST', 
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(contents),
    }),

    delete : () => ({
        method : 'DELETE',
    }),

    put : (contents) => ({
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(contents),
    }),
};

const request = async (url, option = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, option);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (err) {
      alert(`Error : ${err}`);
    }
  };

  export const API = {
    addTeam : (teamName) => {
        const content = {
            name : teamName,
        };
        return request(`api/teams`, option.post(content));
    },

    getTeam : (teamId) => {
        return request(`api/teams/${teamId}`);
    },

    getTeams : () => {
        return request(`api/teams`);
    },

    deleteTeam : (teamId) => {
        return request(`api/teams/${teamId}`, option.delete());
    },

    addMemerToTeam : (teamId, memberName) => {
        const content = {
            name : memberName,
        };
        return request(`api/teams/${teamId}/members`, option.post(content));
    },

    getTodos : (teamId, memberId) => {
        return request(`api/teams/${teamId}/members/${memberId}`);
    },

    addTodo : (teamId, memberId, todoItem) => {
        const content = {
            contents : todoItem,
        }
        return request(`api/teams/${teamId}/members/${memberId}/items`, option.post(content));
    },

    deleteTodo : (teamId, memberId, itemId) => {
        return request(`api/teams/${teamId}/members/${memberId}/items/${itemId}`, option.delete());
    },

    toggleTodo : (teamId, memberId, itemId) => {
        return request(`api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`, option.put());
    },

    editTodo : (teamId, memberId, itemId, newTitle) => {
        content = {
            contents : newTitle,
        };
        return request(`api/teams/${teamId}/members/${memberId}/items/${itemId}`, option.put(content));
    },

    editPriority : (itemId, memberId, itemId, priority) => {
        content = {
            priority : priority,
        };
        return request(`api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, option.put(content));
    },

    deleteAllTodos : (itemId, memberId) => {
        return request(`api/teams/${teamId}/members/${memberId}/items/`, option.delete());
    },


  };