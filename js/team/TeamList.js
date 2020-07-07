import rootApi from '../api/rootApi.js';
import { teamListTemplate } from '../utils/templates.js';

export default class TeamList {
  constructor({ teamNameList, $targetTeamList }) {
    this.teamNameList = teamNameList;
    this.$targetTeamList = $targetTeamList;

    this.render();
  }

  async render() {
    this.teamNameList = await rootApi.fetchTeamList();
    this.$targetTeamList.innerHTML = teamListTemplate(this.teamNameList);
  }
}
