import Component from '../core/Component/Component.js'
import { store } from '../modules/store/homepage.js'
import TeamConnector from '../utils/connector/TeamConnector.js'
import Observable from '../core/Observer/Observable.js'
import { createTeam } from '../modules/team/creator.js'
import { loadingEnd, loadingStart } from '../modules/common/creator.js'
import Event from '../modules/constant/Event.js'

const CREATE_TEAM_BUTTON = 'add-team-button'

const TeamCard = ({ _id, name }) => {
  return `
    <div class="team-card-container">
      <a href="/kanban.html?id=${_id}" class="card">
        <div class="card-title">${name}</div>
      </a>
    </div>
    `
}

export default class TeamList extends Component {
  constructor(target) {
    super(target)
    this.teamLength = 0
  }
  setEvent(target) {
    this.addClickEvents(target)
  }

  async addClickEvents(target) {
    target.addEventListener(Event.CLICK, (event) => {
      if (event.target.id === CREATE_TEAM_BUTTON) {
        const name = prompt('팀 이름을 입력해주세요')

        if (!name) {
          return
        }

        store.dispatch(loadingStart())

        const createTeam$ = Observable.fromPromise(
          TeamConnector.createTeam({ name })
        )

        createTeam$.subscribe({
          next(team) {
            store.dispatch(createTeam(team))
          },
          error(e) {
            console.error(e)
          },
          complete() {
            store.dispatch(loadingEnd())
          },
        })
      }

      event.stopImmediatePropagation()
    })
  }

  template() {
    const { teams } = store.getState()

    return `
      ${teams && teams.map((team) => TeamCard(team)).join('')}
      <div class="add-team-button-container">
        <button id=${CREATE_TEAM_BUTTON} class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `
  }
}
