import { memberListTemplate } from '../utils/templates.js';
import rootApi from '../api/apiHandler.js';
import { ERROR_TYPE_MESSAGE } from '../utils/constants.js';

export default class MemberList {
  constructor({ teamId, $targetTodoAppListContainer }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;
  }
  async render() {
    try {
      const teamInfo = await rootApi.fetchTeam(this.teamId);
      this.$targetTodoAppListContainer.innerHTML = memberListTemplate(
        teamInfo.members,
      );
    } catch (e) {
      console.error(ERROR_TYPE_MESSAGE.CAN_NOT_LOAD);
    }
  }
}
