import { getTeamData } from '../api.js';
import MemberList from '../components/MemberList.js';
import TeamName from '../components/TeamName.js';

export default class Kanban {
  constructor() {
    this.team = [];

    this.TeamName = new TeamName();

    this.MemberList = new MemberList();

    this.init();
  }

  renderTeamName() {
    this.TeamName.render(this.team.name);
  }

  renderMemberList() {
    this.MemberList.render(this.team.members);
  }

  renderAll() {
    this.renderTeamName();
    this.renderMemberList();
  }

  async init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    this.team = await getTeamData(params.id);
    this.renderAll();
  }
}

new Kanban();
