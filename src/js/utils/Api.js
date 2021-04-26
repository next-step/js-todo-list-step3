import URL from '../constants/URL.js'
import { MEMBER_PROPS, TEAM_PROPS } from '../constants/PROPERTIES.js'

const fetchOptions = {
  GET_DATA: async (url) => {
    const response = await fetch(url)
    return response.json()
  },
  POST_DATA: async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

const API = {
  getTeams: async () => await fetchOptions.GET_DATA(URL.GET_TEAMS()),
  postTeam: async (teamName) => await fetchOptions.POST_DATA(URL.POST_TEAM(), { [TEAM_PROPS.NAME]: teamName }),
  getTeam: async (teamId) => await fetchOptions.GET_DATA(URL.GET_TEAM(teamId)),
  postMember: async (memberName, teamId) => await fetchOptions.POST_DATA(URL.POST_MEMBER(teamId), { [MEMBER_PROPS.NAME]: memberName })
}

export default API
