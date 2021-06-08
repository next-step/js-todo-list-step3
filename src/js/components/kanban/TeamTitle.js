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
    const childrenArray = [...appElement.children]

    childrenArray.map((child) => {
      if (child.id !== 'team-title') {
        return null
      }
      return child.remove()
    })

    appElement.insertAdjacentHTML(
      'afterbegin',
      renderTemplate(team)
    )
  }

  teamStore.subscribeTeam(render)
}

export default TeamTitle
