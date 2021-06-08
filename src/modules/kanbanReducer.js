import TodoFilter from '../constant/TodoFilter.js'
import { LOADING_END, LOADING_START } from './common/actions.js'
import { GET_TEAM_DATA } from './todos/actions.js'

const initialState = {
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

    case GET_TEAM_DATA:
      return {
        ...state,
        name: payload.name,
        members: payload.members.map((member) => {
          member.filter = TodoFilter.ALL
          return member
        }),
      }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
