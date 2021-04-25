import { TEAM_PROPS } from '../../constants/PROPERTIES.js'

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
  const render = (teams) => {
    return teams.map(team => renderTemplate(team)).join('')
  }
  return { render }
}

export default TeamList
