import { GET_TEAMS, CREATE_TEAM } from './team/actions.js'

const initialState = {
  teams: [],
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

    default:
      return {
        ...state,
      }
  }
}

export default reducer
