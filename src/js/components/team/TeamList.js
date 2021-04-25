import { TEAM_PROPS } from '../../constants/PROPERTIES.js'
import { teamStore } from '../../utils/Store.js'

const renderTemplate = (team) => {
  return `
    <div class="team-card-container" data-type="team">
      <a href="/kanban.html?id=${team[TEAM_PROPS.ID]}" target="_self" class="card">
        <div class="card-title">
          ${team[TEAM_PROPS.NAME]}
        </div>
      </a>
    </div>
  `
}

const TeamList = () => {
  const teamListContainerElement = document.getElementById('team-list-container')

  const render = (teams) => {
    const childrenArray = [...teamListContainerElement.children]

    childrenArray.map((child) => {
      if (child.dataset.type !== 'user') {
        return null
      }
      return child.remove()
    })

    teamListContainerElement.insertAdjacentHTML(
      'afterbegin',
      teams.map(team => renderTemplate(team)).join('')
    )
  }

  teamStore.subscribeTeamList(render)
}

export default TeamList
