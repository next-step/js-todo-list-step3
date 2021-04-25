import { teamApi, userApi } from "../api/api.js";
import TeamList from "../components/team/TeamList.js";
import MemberList from "../components/team/MemberList.js";

export default class App {
  constructor() {
    this.containerEl = document.getElementById("container");
    this.teamData = [];
    this.appData = [];
    this.selectedUserId = "";
    this.init();
  }

  init() {
    teamApi.get().then((data) => {
      this.teamList = new TeamList({
        containerEl: this.containerEl,
        teamData: data,
        onGetTeamMembers: this.getTeamMembers.bind(this),
        onCreateTeam: this.createTeam.bind(this),
      });
    });
  }

  getAllteams = async () => {
    await teamApi.get().then((data) => {
      this.teamData = data;
    });
    this.render();
  };

  getTeamMembers = async (teamId) => {
    await teamApi.get(teamId).then((data) => {
      this.memberList = new MemberList({
        teamId,
        containerEl: this.containerEl,
        membersData: data.members,
      });
    });
  };

  createTeam = async (name) => {
    await teamApi.create(name);
    this.getAllteams();
  };

  render() {
    this.teamList.setState(this.teamData);
  }
}
