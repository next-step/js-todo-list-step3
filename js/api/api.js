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

const METHOD = {
  GET() {
    return {
      method: 'GET',
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  },
  POST(content) {
    return {
      method: 'POST',
      body: JSON.stringify(content),
    }
  },
  PUT(content) {
    return {
      method: 'PUT',
      body: JSON.stringify(content),
    }
  },
}

const addTeam = async (content) => {
  try {
    return await requestApi(`/api/teams`, METHOD.POST(content))
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_ADD_TEAM)
  }
}

const getTeam = async (teamId) => {
  try {
    return await requestApi(`/api/teams/${teamId}`, METHOD.GET())
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_GET_TEAM)
  }
}

const getTeamList = async () => {
  try {
    return await requestApi(`/api/teams/`, METHOD.GET())
  } catch (err) {
    console.error(err)
    console.err(ERROR_MESSAGE.NO_GET_TEAM_LIST)
    return {}
  }
}

const removeTeam = async (teamId) => {
  try {
    return await requestApi(`/api/teams/${teamId}`, METHOD.DELETE())
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_REMOVE_TEAM)
  }
}

const addMember = async (teamId, content) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members`,
      METHOD.POST(content)
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_ADD_TEAM_MEMBER)
  }
}

const getTodoList = async (teamId, memberId) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}`,
      METHOD.GET()
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_GET_TODOLIST)
  }
}

const addTodo = async (teamId, memberId, content) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}/items`,
      METHOD.POST(content)
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_ADD_TODO)
  }
}

const toggleTodo = async (teamId, memberId, itemId) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      METHOD.PUT()
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_TOGGLE_TODO)
  }
}

const removeTodo = async (teamId, memberId, itemId) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      METHOD.DELETE()
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_REMOVE_TODO)
  }
}

const removeAllTodoList = async (teamId, memberId) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}/items`,
      METHOD.DELETE()
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_REMOVE_TODOLIST)
  }
}

const changeTodo = async (teamId, memberId, itemId, content) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      METHOD.PUT(content)
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_CHANGE_TODO)
  }
}

const changeTodoPriority = async (teamId, memberId, itemId, content) => {
  try {
    return await requestApi(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      METHOD.PUT(content)
    )
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_CHANGE_TODO_PRIORITY)
  }
}

export const api = {
  addTeam,
  getTeam,
  getTeamList,
  removeTeam,
  addMember,
  getTodoList,
  addTodo,
  toggleTodo,
  removeTodo,
  removeAllTodoList,
  changeTodo,
  changeTodoPriority,
}
