import rootApi from '../api/apiHandler.js';
import { TeamListTemplate } from '../util/templates.js';

export default class TeamList {
  constructor({ teamNameList, $targetTeamList }) {
    this.teamNameList = teamNameList;
    this.$targetTeamList = $targetTeamList;

    this.render();
  }

  async render() {
    this.teamNameList = await rootApi.fetchTeamList();
    this.$targetTeamList.innerHTML = TeamListTemplate(this.teamNameList);
  }
}
