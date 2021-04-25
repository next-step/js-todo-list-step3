import API from '../utils/Api.js'
import { teamStore } from '../utils/Store.js'

import TeamList from '../components/team/TeamList.js'

const Team = () => {
  const updateTeams = async () => {
    const getTeams = await API.getTeams()
    teamStore.setTeamList(getTeams)
  }

  const init = () => {
    TeamList()
    return updateTeams()
  }

  init()
}

Team()
