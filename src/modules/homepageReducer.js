import { LOADING_END, LOADING_START } from './common/actions.js'
import { GET_TEAMS, CREATE_TEAM } from './team/actions.js'

const initialState = {
  teams: [],
  loading: false,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: [...payload.teams],
      }

    case CREATE_TEAM:
      return {
        ...state,
        teams: [...state.teams, payload.team],
      }

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

    default:
      return {
        ...state,
      }
  }
}

export default reducer
