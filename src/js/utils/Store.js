export const teamStore = (function () {
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
