import TodoFilter from '../constant/TodoFilter.js'
import { LOADING_END, LOADING_START } from './common/actions.js'
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
} from './todos/actions.js'

const initialState = {
  _id: '',
  name: '',
  members: [],
  loading: false,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_START:
      return {
        ...state,
        loading: payload.loading,
      }

    case LOADING_END:
      return {
        ...state,
        loading: payload.loading,
      }

    case ADD_MEMBER:
      return {
        ...state,
        members: [...payload.members],
      }

    case GET_TEAM_DATA:
      return {
        ...state,
        _id: payload._id,
        name: payload.name,
        members: payload.members.map((member) => {
          member.filter = TodoFilter.ALL
          return member
        }),
      }

    case CREATE_TODO:
      return {
        ...state,

        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: [...member.todoList, payload.todo],
          }
        }),
      }

    case TOGGLE_TODO:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: member.todoList.map((todoItem) =>
              todoItem._id === payload.itemId
                ? { ...todoItem, isCompleted: !todoItem.isCompleted }
                : todoItem
            ),
          }
        }),
      }

    case EDIT_TODO:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: member.todoList.map((todoItem) =>
              todoItem._id === payload.itemId
                ? { ...todoItem, isEditing: true }
                : todoItem
            ),
          }
        }),
      }

    case CANCLE_EDIT:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: member.todoList.map((todoItem) =>
              todoItem._id === payload.itemId
                ? { ...todoItem, isEditing: false }
                : todoItem
            ),
          }
        }),
      }

    case EDIT_COMPLETE:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: member.todoList.map((todoItem) =>
              todoItem._id === payload.itemId
                ? { ...todoItem, isEditing: false, contents: payload.contents }
                : todoItem
            ),
          }
        }),
      }
    case DELETE_TODO:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: member.todoList.filter(
              (todoItem) => todoItem._id !== payload.itemId
            ),
          }
        }),
      }

    case DELETE_TODOS:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: [],
          }
        }),
      }

    case CHANGE_FILTER:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            filter: payload.filter,
          }
        }),
      }

    case PRIORITY_TODO:
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id !== payload.memberId) {
            return member
          }

          return {
            ...member,
            todoList: member.todoList.map((todoItem) =>
              todoItem._id === payload.itemId
                ? { ...todoItem, priority: payload.priority }
                : todoItem
            ),
          }
        }),
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
