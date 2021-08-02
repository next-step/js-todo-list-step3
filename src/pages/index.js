import { $ } from '../utils/selectors.js'
import { getTeamsAPI, createTeamAPI } from '../api/requests.js'

export default class App {
  constructor() {
    this.state = { teams: [] }
    this.init()
  }
  init = async () => {
    this.state = { teams: await getTeamsAPI() }
    this.render()
    this.mount()
  }
  mount = () => {
    $('#add-team-button').addEventListener('click', async (e) => {
      const teamName = prompt('팀 이름을 입력해주세요')
      const newTeam = await createTeamAPI({ name: teamName })
      const newState = { teams: [...this.state.teams, newTeam] }
      this.setState(newState)
    })
  }
  setState = (newState) => {
    this.state = newState
    this.render()
    this.mount()
  }
  render = () => {
    $('.team-list-container').innerHTML = `${this.state.teams
      .map(({ _id, name }) => {
        return `<div class="team-card-container">
                  <a href="/kanban.html?id=${_id}" class="card">
                    <div class="card-title">${name}</div>
                  </a>
                </div>`
      })
      .join('')}
      <div class="add-team-button-container">
          <button id="add-team-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </div>
        `
  }
}
