import createAction from '../../core/redux/createAction.js'
import { CREATE_TEAM, GET_TEAMS } from './actions.js'

const getTeams = (teams) => createAction(GET_TEAMS, { teams })

const createTeam = (team) => createAction(CREATE_TEAM, { team })

export { getTeams, createTeam }
