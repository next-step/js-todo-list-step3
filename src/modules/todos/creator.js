import { GET_TEAM_DATA } from './actions.js'
import createAction from '../../core/redux/createAction.js'

const getTeamData = (datas) => createAction(GET_TEAM_DATA, { ...datas })

export { getTeamData }
