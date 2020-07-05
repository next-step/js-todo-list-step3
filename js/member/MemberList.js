import { MemberListTemplate } from '../util/templates.js';
import rootApi from '../api/apiHandler.js';
import { ERROR_TYPE } from '../util/constants.js';

export default class KanbanMemberList {
  constructor({ teamId, $targetTodoAppListContainer }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.render();
  }

  async render() {
    try {
      const teamInfo = await rootApi.fetchTeam(this.teamId);
      this.$targetTodoAppListContainer.innerHTML = MemberListTemplate(
        teamInfo.members,
      );
    } catch (e) {
      console.error(ERROR_TYPE.CAN_NOT_LOAD);
    }
  }
}
