import URL from '../constants/URL.js'
import { MEMBER_PROPS, TEAM_PROPS, TODO_PROPS } from '../constants/PROPERTIES.js'

const fetchOptions = {
  async GET_DATA (url) {
    const response = await fetch(url)
    return await response.json()
  },
  async POST_DATA (url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  },
  async DELETE_DATA (url) {
    const response = await fetch(url, {
      method: 'DELETE'
    })
    return await response.json()
  }
}

const API = {
  async getTeams () {
    return await fetchOptions.GET_DATA(URL.GET_TEAMS())
  },
  async postTeam (teamName) {
    return await fetchOptions.POST_DATA(URL.POST_TEAM(), { [TEAM_PROPS.NAME]: teamName })
  },
  async getTeam (teamId) {
    return await fetchOptions.GET_DATA(URL.GET_TEAM(teamId))
  },
  async postMember (memberName, teamId) {
    return await fetchOptions.POST_DATA(URL.POST_MEMBER(teamId), { [MEMBER_PROPS.NAME]: memberName })
  },
  async postTodo (newTodo, teamId, memberId) {
    return await fetchOptions.POST_DATA(URL.POST_TODO(teamId, memberId), { [TODO_PROPS.CONTENTS]: newTodo })
  },
  async deleteTodo (teamId, memberId, itemId) {
    await fetchOptions.DELETE_DATA(URL.DELETE_TODO(teamId, memberId, itemId))
  }
}

export default API
