import HttpRequest from '../../core/Http/HttpRequest.js'
import { HttpEndpoint } from '../../constant/Http.js'

export default Object.freeze({
  getMembers() {
    return HttpRequest.get(HttpEndpoint.teams())
  },

  getTodoList(teamId, memberId) {
    return HttpRequest.get(HttpEndpoint.todos(teamId, memberId))
  },

  createTodoItem(teamId, memberId, data) {
    return HttpRequest.post(HttpEndpoint.items(teamId, memberId), data)
  },

  deleteTodoItem(teamId, memberId, itemId) {
    return HttpRequest.delete(HttpEndpoint.item(teamId, memberId, itemId))
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
