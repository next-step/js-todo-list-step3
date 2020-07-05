import { Header } from '../components/common/index.js'
import { AddMemberButton } from '../components/kanban/index.js'
import { TodoContainer } from '../containers/index.js'
import teamApis from '../api/teamApis.js'
import { getURLQueryArray } from '../utils/functions.js'
import { kanbanHeaderTemplate } from '../utils/templates.js'

export default function KanBanContainer() {
  if (new.target !== KanBanContainer) {
    return new KanBanContainer()
  }

  this.init = async () => {
    try {
      const queries = getURLQueryArray(window.location.search)
      const teamId = queries[0]['teamId']
      const { name, members } = await teamApis.getTeamOne(teamId)
      console.log(members)
      new Header({
        selector: '#user-title',
        textContent: kanbanHeaderTemplate(name),
      })
      members.forEach((member) => {
        new TodoContainer({
          ...member,
          teamId,
          selector: '.todoapp-list-container',
        })
      })
      new AddMemberButton({
        selector: '.todoapp-list-container',
      })
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}
