import URL from '../constants/URL.js'

const fetchOptions = {
  GET_DATA: async (url) => {
    const response = await fetch(url)
    return response.json()
  }

}

const API = {
  getTeams: async () => await fetchOptions.GET_DATA(URL.GET_TEAMS)
}

export default API
