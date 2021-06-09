import {
  ADD_MEMBER,
  CANCLE_EDIT,
  CHANGE_FILTER,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  EDIT_COMPLETE,
  EDIT_TODO,
  GET_TEAM_DATA,
  PRIORITY_TODO,
  TOGGLE_TODO,
} from './actions.js'
import createAction from '../../core/redux/createAction.js'

const getTeamData = (datas) => createAction(GET_TEAM_DATA, { ...datas })
const addMember = (members) => createAction(ADD_MEMBER, { members })
const createTodo = (memberId, todo) =>
  createAction(CREATE_TODO, { memberId, todo })
const editTodo = (memberId, itemId) =>
  createAction(EDIT_TODO, { memberId, itemId })
const editComplete = (memberId, itemId, contents) =>
  createAction(EDIT_COMPLETE, { memberId, itemId, contents })
const cancelEditing = (memberId, itemId) =>
  createAction(CANCLE_EDIT, { memberId, itemId })
const deleteTodo = (memberId, itemId) =>
  createAction(DELETE_TODO, { memberId, itemId })
const deleteTodos = (memberId) => createAction(DELETE_TODOS, { memberId })
const toggleTodo = (memberId, itemId) =>
  createAction(TOGGLE_TODO, { memberId, itemId })
const priorityTodo = (memberId, itemId, priority) =>
  createAction(PRIORITY_TODO, { memberId, itemId, priority })
const changeFilter = (memberId, filter) =>
  createAction(CHANGE_FILTER, { memberId, filter })

export {
  getTeamData,
  addMember,
  createTodo,
  deleteTodo,
  deleteTodos,
  toggleTodo,
  priorityTodo,
  changeFilter,
  editTodo,
  cancelEditing,
  editComplete,
}
