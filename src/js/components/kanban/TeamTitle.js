import { TEAM_PROPS } from '../../constants/PROPERTIES.js'
import { teamStore } from '../../utils/Store.js'

const renderTemplate = (team) => {
  return `
    <h1 id="team-title">
      <span><strong>${team[TEAM_PROPS.NAME]}</strong>'s Todo List</span>
    </h1>
  `
}

const TeamTitle = () => {
  const appElement = document.getElementById('app')

  const render = (team) => {
    appElement.insertAdjacentHTML(
      'afterbegin',
      renderTemplate(team)
    )
  }

  teamStore.subscribeTeam(render)
}

export default TeamTitle
