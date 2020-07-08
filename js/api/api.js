import { BASE_URL, ERROR_MESSAGE } from '../utils/constant.js'

const requestApi = async (path, { method = 'GET', header, body }) => {
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (header) {
    option.headers = Object.assign(option.headers, header)
  }

  if (body) {
    option.body = body
  }
  const res = await fetch(`${BASE_URL}${path}`, option)

  if (!res.ok) {
    throw new Error({ status: res.status, statusText: res.statusText })
  }
  return await res.json()
}

export const api = (() => {
  return {
    async addTeam(content) {
      try {
        return await requestApi(`/api/teams`, {
          method: 'POST',
          body: JSON.stringify(content),
        })
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_ADD_TEAM)
      }
    },

    async getTeam(teamId) {
      try {
        return await requestApi(`/api/teams/${teamId}`, { method: 'GET' })
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_GET_TEAM)
      }
    },

    async getTeamList() {
      try {
        return await requestApi(`/api/teams/`, { method: 'GET' })
      } catch (err) {
        console.error(err)
        console.err(ERROR_MESSAGE.NO_GET_TEAM_LIST)
        return {}
      }
    },

    async removeTeam(teamId) {
      try {
        return await requestApi(`/api/teams/${teamId}`, { method: 'DELETE' })
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_REMOVE_TEAM)
      }
    },

    async addMember(teamId, content) {
      try {
        return await requestApi(`/api/teams/${teamId}/members`, {
          method: 'POST',
          body: JSON.stringify(content),
        })
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_ADD_TEAM_MEMBER)
      }
    },

    async getTodoList(teamId, memberId) {
      try {
        return await requestApi(`/api/teams/${teamId}/members/${memberId}`, {
          mehtod: 'GET',
        })
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_GET_TODOLIST)
      }
    },

    async addTodo(teamId, memberId, content) {
      try {
        return await requestApi(
          `/api/teams/${teamId}/members/${memberId}/items`,
          {
            method: 'POST',
            body: JSON.stringify(content),
          }
        )
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_ADD_TODO)
      }
    },

    async toggleTodo(teamId, memberId, itemId) {
      try {
        return await requestApi(
          `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
          { method: 'PUT' }
        )
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_TOGGLE_TODO)
      }
    },

    async removeTodo(teamId, memberId, itemId) {
      try {
        return await requestApi(
          `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
          { method: 'DELETE' }
        )
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_REMOVE_TODO)
      }
    },

    async removeAllTodoList(teamId, memberId) {
      try {
        return await requestApi(
          `/api/teams/${teamId}/members/${memberId}/items`,
          { method: 'DELETE' }
        )
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_REMOVE_TODOLIST)
      }
    },

    async changeTodo(teamId, memberId, itemId, content) {
      try {
        return await requestApi(
          `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
          {
            method: 'PUT',
            body: JSON.stringify(content),
          }
        )
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_CHANGE_TODO)
      }
    },

    async changeTodoPriority(teamId, memberId, itemId, content) {
      try {
        return await requestApi(
          `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
          {
            method: 'PUT',
            body: JSON.stringify(content),
          }
        )
      } catch (err) {
        console.error(err)
        alert(ERROR_MESSAGE.NO_CHANGE_TODO_PRIORITY)
      }
    },
  }
})()
