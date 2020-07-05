import { METHOD, request, requestWithReturn } from './default.js'
import { API_URL } from '../utils/constants.js'

const api = (() => {
  return {
    addTeamMember(teamId, memberName) {
      return request(
        API_URL + `/api/teams/${teamId}/members`,
        METHOD.POST({ name: memberName })
      )
    },
    createTodo({ teamId, memberId, contents }) {
      return request(
        API_URL + `/api/teams/${teamId}/members/${memberId}/items`,
        METHOD.POST({ contents })
      )
    },
    getTodosByMember(teamId, memberId) {
      return requestWithReturn(
        API_URL + `/api/teams/${teamId}/members/${memberId}`
      )
    },
  }
})()

export default api
