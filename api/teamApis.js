import { METHOD, request, requestWithReturn } from './default.js'
import { API_URL } from '../utils/constants.js'

const api = (() => {
  return {
    getTeams() {
      return requestWithReturn(API_URL + '/api/teams')
    },
    getTeamOne(id) {
      return requestWithReturn(API_URL + `/api/teams/${id}`)
    },
  }
})()

export default api
