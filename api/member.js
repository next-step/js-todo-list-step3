import { METHOD, request, requestWithReturn } from './default.js'
import { API_URL } from '../utils/constants.js'

const api = (() => {
  return {
    addTeamMember(teamId, memberName) {
      return request(
        `${API_URL}/api/teams/${teamId}/members`,
        METHOD.POST({ name: memberName })
      )
    },
    createTodo({ teamId, memberId, contents }) {
      return request(
        `${API_URL}/api/teams/${teamId}/members/${memberId}/items`,
        METHOD.POST({ contents })
      )
    },
    getMemberTodos(teamId, memberId) {
      return requestWithReturn(
        `${API_URL}/api/teams/${teamId}/members/${memberId}`
      )
    },
    toggleTodo({ teamId, memberId, itemId }) {
      return request(
        `${API_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
        METHOD.PUT()
      )
    },
    deleteTodo({ teamId, memberId, itemId }) {
      return request(
        `${API_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
        METHOD.DELETE()
      )
    },
    deleteAllTodo(teamId, memberId) {
      return request(
        `${API_URL}/api/teams/${teamId}/members/${memberId}/items`,
        METHOD.DELETE()
      )
    },
    updateTodoContent(args) {
      const { teamId, memberId, itemId, contents } = args
      return request(
        `${API_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
        METHOD.PUT({ contents })
      )
    },
    updateTodoPriority(args) {
      const { teamId, memberId, itemId, priority } = args
      return request(
        `${API_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
        METHOD.PUT({ priority })
      )
    },
    changeTodoItemIndex({ teamId, itemId, body }) {
      return request(
        `${API_URL}/api/teams/${teamId}/items/${itemId}/sort`,
        METHOD.PUT(body)
      )
    },
    changeTodoListIndex({ teamId, itemId, body }) {
      return request(
        `${API_URL}/api/teams/${teamId}/items/${itemId}/sort`,
        METHOD.PUT(body)
      )
    },
  }
})()

export default api
