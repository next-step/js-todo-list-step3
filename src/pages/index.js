import { getTeamListData } from '../api.js';
import TeamList from '../components/TeamList.js';

export default class Home {
  constructor() {
    this.teams = [];

    this.TeamList = new TeamList();

    this.init();
  }

  renderTeamList() {
    this.TeamList.render(this.teams);
  }

  async init() {
    this.teams = await getTeamListData();
    this.renderTeamList();
  }
}

new Home();
