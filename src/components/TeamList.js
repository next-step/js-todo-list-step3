import Component from '../core/Component/Component.js'

export default class TeamList extends Component {
  setEvent(target) {
    this.addClickEvents(target)
  }

  addClickEvents(target) {
    target.addEventListener(Event.CLICK, (event) => {
      const action = event.target.dataset.action

      console.log(action)

      event.stopImmediatePropagation()
    })
  }

  template() {
    return `
      <div class="team-card-container">
      <a href="/kanban.html" class="card">
        <div class="card-title">Team A</div>
      </a>
      </div>
      <div class="team-card-container">
        <a href="/kanban.html" class="card">
          <div class="card-title">Team B</div>
        </a>
      </div>
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `
  }
}
