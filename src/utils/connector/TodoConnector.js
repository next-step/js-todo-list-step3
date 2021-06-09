import HttpRequest from '../../core/Http/HttpRequest.js'
import { HttpEndpoint } from '../../constant/Http.js'

export default Object.freeze({
  getMembers() {
    return HttpRequest.get(HttpEndpoint.teams())
  },

  addMember(teamId, name) {
    return HttpRequest.post(HttpEndpoint.members(teamId), { name })
  },

  getTeam(teamId) {
    return HttpRequest.get(HttpEndpoint.team(teamId))
  },

  getTodoList(teamId, memberId) {
    return HttpRequest.get(HttpEndpoint.todos(teamId, memberId))
  },

  createTodoItem(teamId, memberId, contents) {
    return HttpRequest.post(HttpEndpoint.items(teamId, memberId), { contents })
  },

  deleteTodoItem(teamId, memberId, itemId) {
    return HttpRequest.del(HttpEndpoint.item(teamId, memberId, itemId))
  },

  editItem(teamId, memberId, itemId, contents) {
    return HttpRequest.put(HttpEndpoint.item(teamId, memberId, itemId), {
      contents,
    })
  },

  toggleTodoItem(teamId, memberId, itemId) {
    return HttpRequest.put(HttpEndpoint.toggleItem(teamId, memberId, itemId))
  },

  priorityItem(teamId, memberId, itemId) {
    return HttpRequest.put(HttpEndpoint.priorityItem(teamId, memberId, itemId))
  },

  deleteTodoItems(teamId, memberId) {
    return HttpRequest.delete(HttpEndpoint.items(teamId, memberId))
  },
})
