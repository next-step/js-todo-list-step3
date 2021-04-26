import URL from '../constants/URL.js'
import { TEAM_PROPS } from '../constants/PROPERTIES.js'

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
  postTeam: async (teamName) => await fetchOptions.POST_DATA(URL.POST_TEAM(), { [TEAM_PROPS.NAME]: teamName })
}

export default API
