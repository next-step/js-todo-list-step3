import {
  ADD_MEMBER,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  ADD_TODO,
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  CHANGE_FILTER,
  CHNAGE_MODE,
  DELETE_ALL_TODO,
  DELETE_ALL_TODO_ERROR,
  DELETE_ALL_TODO_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  GET_MEMBERS,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  SET_PRIORITY,
  SET_PRIORITY_ERROR,
  SET_PRIORITY_SUCCESS,
  TOGGLE_TODO,
  TOGGLE_TODO_ERROR,
  TOGGLE_TODO_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
} from './action';

import Mode from '@/constant/todoFilter';

const initialState = {
  loading: false,
  members: null,
  error: null,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        loading: true,
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        members: action.payload.map((member) => ({
          ...member,
          todoList: member.todoList.map((todo) => ({
            ...todo,
            editMode: false,
          })),
          mode: Mode.ALL,
        })),
      };
    case GET_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        members: state.members.map((member) =>
          member._id === action.payload.id
            ? { ...member, mode: action.payload.mode }
            : member
        ),
      };

    case ADD_MEMBER:
      return {
        ...state,
        loading: true,
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        members: action.payload.map((member) => ({
          ...member,
          todoList: member.todoList.map((todo) => ({
            ...todo,
            editMode: false,
          })),
          mode: Mode.ALL,
        })),
      };
    case ADD_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHNAGE_MODE:
      return {
        ...state,
        members: state.members.map((member) =>
          member._id === action.payload.memberId
            ? {
                ...member,
                todoList: member.todoList.map((todo) =>
                  todo._id === action.payload.itemId
                    ? { ...todo, editMode: !todo.editMode }
                    : todo
                ),
              }
            : member
        ),
      };

    case ADD_TODO:
      return {
        ...state,
        loading: true,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.map((member) =>
          member._id === action.payload.id
            ? { ...member, todoList: [...member.todoList, action.payload.todo] }
            : member
        ),
      };
    case ADD_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TODO:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.map((member) =>
          member._id === action.payload.memberId
            ? {
                ...member,
                todoList: member.todoList.map((todo) =>
                  todo._id === action.payload.itemId
                    ? action.payload.todo
                    : todo
                ),
              }
            : member
        ),
      };
    case UPDATE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_TODO:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.map((member) =>
          member._id === action.payload.memberId
            ? {
                ...member,
                todoList: member.todoList.filter(
                  (todo) => todo._id !== action.payload.itemId
                ),
              }
            : member
        ),
      };
    case DELETE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ALL_TODO:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ALL_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.map((member) =>
          member._id === action.payload ? { ...member, todoList: [] } : member
        ),
      };
    case DELETE_ALL_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TOGGLE_TODO:
      return {
        ...state,
        loading: true,
      };
    case TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.map((member) =>
          member._id === action.payload.memberId
            ? {
                ...member,
                todoList: member.todoList.map((todo) =>
                  todo._id === action.payload.itemId
                    ? action.payload.todo
                    : todo
                ),
              }
            : member
        ),
      };
    case TOGGLE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_PRIORITY:
      return {
        ...state,
        loading: true,
      };
    case SET_PRIORITY_SUCCESS:
      return {
        ...state,
        loading: false,
        members: state.members.map((member) =>
          member._id === action.payload.memberId
            ? {
                ...member,
                todoList: member.todoList.map((todo) =>
                  todo._id === action.payload.itemId
                    ? action.payload.todo
                    : todo
                ),
              }
            : member
        ),
      };
    case SET_PRIORITY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
