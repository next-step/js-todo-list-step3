export const teamListStore = (function () {
  let teamList = []
  const teamListListener = []

  const subscribeTeamList = (callback) => {
    return teamListListener.push(callback)
  }

  const publishTeamList = () => {
    return teamListListener.map((listener) => {
      return listener(teamList)
    })
  }

  const setTeamList = (newTeamList) => {
    teamList = newTeamList
    publishTeamList()
  }

  return { subscribeTeamList, setTeamList }
})()

export const teamStore = (function () {
  let team = {}
  const teamListener = []

  const subscribeTeam = (callback) => {
    return teamListener.push(callback)
  }

  const publishTeam = () => {
    return teamListener.map((listener) => {
      return listener(team)
    })
  }

  const setTeam = (newTeamList) => {
    team = newTeamList
    publishTeam()
  }

  return { subscribeTeam, setTeam }
})()
