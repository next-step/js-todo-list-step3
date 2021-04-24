import { TeamList } from '../component/team/TeamList.js';

export class TeamApp {
  constructor(){
    this.teamList = new TeamList();
  }

  renderAll({teams}) {
    this.teamList.render(teams);
  }
}
