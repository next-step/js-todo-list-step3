import { Header } from '../components/common/index.js'
import { AddMemberButton } from '../components/kanban/index.js'
import { TodoContainer } from '../containers/index.js'
import teamApis from '../api/team.js'
import {
  getURLQueryArray,
  redirectToMainPage,
  clearChildNode,
} from '../utils/functions.js'
import { kanbanHeaderTemplate } from '../utils/templates.js'

export default function KanBanContainer() {
  if (new.target !== KanBanContainer) {
    return new KanBanContainer()
  }
  this.init = () => {
    try {
      const queries = getURLQueryArray(window.location.search)
      this.teamId = queries[0]['teamId']
      this.teamName = queries[1]['teamName']
      if (!this.teamId || !this.teamName) {
        redirectToMainPage()
      }
      new Header({
        selector: '#user-title',
        textContent: kanbanHeaderTemplate(this.teamName),
      })
      this.render()
    } catch (e) {
      redirectToMainPage()
    }
  }

  this.render = async () => {
    try {
      clearChildNode('.todoapp-list-container') // todoapp-list-container 초기화

      const { members } = await teamApis.getTeamOne(this.teamId)
      members.forEach((member) => {
        new TodoContainer({
          ...member,
          selector: '.todoapp-list-container',
          teamId: this.teamId,
        })
      })
      new AddMemberButton({
        selector: '.todoapp-list-container',
        teamId: this.teamId,
        renderKanbanPage: this.render,
      })
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}
