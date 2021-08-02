const headers = { 'Content-Type': "application/json"};

const HTTP_METHOD = {  
  POST(data) {
    return {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...data
      }),
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        ...data
      }),
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  },
}

const api = (() => {
  const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/teams'
  
  const request = async (uri, config) => await fetch(BASE_URL + uri, config)
  const requestJsonData = async (uri, config) => await fetch(BASE_URL + uri, config).then(data => data.json());

  const team = {
    add(data) {
      return requestJsonData('', HTTP_METHOD.POST(data));
    },

    get(teamId) {
      return requestJsonData(`/${teamId}`);
    },
    
    getList() {
      return requestJsonData('');
    },

    delete(teamId) {
      return request(`/${teamId}`, HTTP_METHOD.DELETE());
    }
  };

  const member = {
    addMember(teamId, data) {
      return requestJsonData(`/${teamId}/members`, HTTP_METHOD.POST(data));
    },
  };

  const todo = {
    getList(teamId, memberId) {
      return requestJsonData(`/${teamId}/members/${memberId}`);
    },

    add(teamId, memberId, data) {
      return requestJsonData(
        `/${teamId}/members/${memberId}/items`,
        HTTP_METHOD.POST(data)
      );
    },

    delete(teamId, memberId, itemId) {
      return request(
        `/${teamId}/members/${memberId}/items/${itemId}`,
        HTTP_METHOD.DELETE()
      );
    },

    deleteAll(teamId,memberId) {
      return request(
        `/${teamId}/members/${memberId}/items`,
        HTTP_METHOD.DELETE()
      );
    },

    toggle(teamId, memberId, itemId, data) {
      return requestJsonData(`/${teamId}/members/${memberId}/items/${itemId}/toggle`, HTTP_METHOD.PUT(data));
    },

    update(teamId, memberId, itemId, data) {
      return requestJsonData(
        `/${teamId}/members/${memberId}/items/${itemId}`,
        HTTP_METHOD.PUT(data)
      );
    },

    priority(teamId, memberId, itemId, data) {
      return requestJsonData(
        `/${teamId}/members/${memberId}/items/${itemId}/priority`,
        HTTP_METHOD.PUT(data)
      );
    },
  }

  return {
    team,
    member,
    todo,
  }

})();

export default api;











