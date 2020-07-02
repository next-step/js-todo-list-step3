import { MemberListTemplate } from './util/templates.js';
import rootApi from './api/apiHandler.js';


export default class KanbanMemberList {
  constructor({ teamId, $targetTodoAppListContainer }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;
    
    this.render()
  }

  async render() {
    const teamInfo = await rootApi.fetchTeam(this.teamId)
    this.$targetTodoAppListContainer.innerHTML = MemberListTemplate(teamInfo.members)
  }
}
