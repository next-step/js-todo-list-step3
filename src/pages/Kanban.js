import { getTeamAPI, createMemberAPI } from '../api/requests.js'
import TodoList from '../containers/TodoList/index.js'
import { $ } from '../utils/selectors.js'

class Kanban {
  constructor() {
    this.teamId = ''
    this.list = []
    this.init()
  }
  init = async () => {
    //URLSEARCHPARM
    const teamId = window.location.href.match(/(?<=\?id=)\S*/g)
    const team = await getTeamAPI(teamId)
    this.teamId = team._id
    team.members.forEach((member) => {
      this.list.push(new TodoList('#todoapp-list', { teamId: team._id, member }))
    })
    this.render()
    this.mount()
  }
  mount = () => {
    $('#add-user-button').addEventListener('click', async (e) => {
      const name = prompt('팀 이름을 입력해주세요')
      const team = await createMemberAPI(this.teamId, { name })
      this.list.push(
        new TodoList('#todoapp-list', {
          teamId: team._id,
          member: team.members[team.members.length - 1],
        })
      )
      this.render()
      this.mount()
    })

    this.list.forEach((TodoList) => {
      TodoList.mount()
    })
  }
  render = () => {
    $('#app').innerHTML = `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo List</span>
      </h1>
      <ul id="todoapp-list" class="todoapp-list-container flex-column-container">
        ${this.list.map((TodoList) => TodoList.template()).join()}
        <li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </li>
      </ul>
    `
  }
}

new Kanban()
