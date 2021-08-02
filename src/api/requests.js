import { PATH } from './path.js'
import { GET, POST, DELETE, PUT } from './http.js'

//TEAM
export const getTeamsAPI = () => GET(`${PATH}/teams`)
export const getTeamAPI = (teamId) => GET(`${PATH}/teams/${teamId}`)
export const createTeamAPI = (data) => POST(`${PATH}/teams`, data)

//MEMBER
export const createMemberAPI = (teamId, data) => POST(`${PATH}/teams/${teamId}/members`, data)

//TODO
export const createTodoAPI = (teamId, memberId, data) => POST(`${PATH}/teams/${teamId}/members/${memberId}/items`, data)
export const deleteTodoAPI = (teamId, memberId, itemId) =>
  DELETE(`${PATH}/teams/${teamId}/members/${memberId}/items/${itemId}`)

export const updateTodoAPI = (teamId, memberId, itemId) =>
  PUT(`${PATH}/teams/${teamId}/members/${memberId}/items/${itemId}`, data)
export const updateTodoToggleAPI = (teamId, memberId, itemId) =>
  PUT(`${PATH}/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`)
export const updateTodoPriorityAPI = (teamId, memberId, itemId, data) =>
  PUT(`${PATH}/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, data)
export const deleteAllTodos = (teamId, memberId) => {
  DELETE(`${PATH}/teams/${teamId}/members/${memberId}/items`)
}
