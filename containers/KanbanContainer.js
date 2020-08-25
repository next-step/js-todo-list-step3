import { Header } from '../components/common/index.js'
import { AddMemberButton } from '../components/kanban/index.js'
import { TodoContainer } from '../containers/index.js'
import teamApis from '../api/team.js'
import { getURLQueryArray, redirectToMainPage } from '../utils/functions.js'
import {
  kanbanHeaderTemplate,
  todoListHTMLTemplate,
  memberAddHTMLTemplate,
} from '../utils/templates.js'
import { CLASS_NAME } from '../utils/constants.js'

export default function KanBanContainer({ selector }) {
  if (new.target !== KanBanContainer) {
    return new KanBanContainer({ selector })
  }
  this.init = () => {
    try {
      this.$target = document.querySelector(selector)
      const queries = getURLQueryArray(window.location.search)
      this.teamId = queries[0]['teamId']
      this.teamName = queries[1]['teamName']
      if (!this.teamId || !this.teamName) {
        redirectToMainPage()
      }
      new Header({
        selector: `.${CLASS_NAME.USER_TITLE}`,
        textContent: kanbanHeaderTemplate(this.teamName),
      })
      this.render()
    } catch (e) {
      redirectToMainPage()
    }
  }

  this.render = async () => {
    try {
      const { _id, members } = await teamApis.getTeamOne(this.teamId)
      this.$target.innerHTML = members
        .map(todoListHTMLTemplate)
        .join('')
        .concat(memberAddHTMLTemplate)

      members.forEach((member) => {
        new TodoContainer({
          ...member,
          teamId: _id,
        })
      })

      new AddMemberButton({
        selector: `.${CLASS_NAME.ADD_BUTTON}`,
        teamId: this.teamId,
        renderKanbanPage: this.render,
      })
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}
