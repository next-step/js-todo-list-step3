import HttpRequest from '../../core/Http/HttpRequest.js'
import { HttpEndpoint } from '../../constant/Http.js'

export default Object.freeze({
  getTeams() {
    return HttpRequest.get(HttpEndpoint.teams())
  },

  getTeam(teamId) {
    return HttpRequest.get(HttpEndpoint.team(teamId))
  },

  createTeam(data) {
    return HttpRequest.post(HttpEndpoint.teams(), data)
  },

  destroyTeam(teamId) {
    return HttpRequest.del(HttpEndpoint.team(teamId))
  },
})
