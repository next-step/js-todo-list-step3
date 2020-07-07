import rootApi from '../api/rootApi.js';
import TeamList from './TeamList.js';
import TeamInput from './TeamInput.js';

export default class TeamApp {
  constructor({ teamNameList, $targetTeamList }) {
    this.teamNameList = teamNameList;

    this.teamInput = new TeamInput({
      $targetTeamList,
      onInputTeam: async (teamName) => {
        const existentTeamList = await rootApi.fetchTeamList();
        const existentTeamNameList = existentTeamList.map((team) => team.name);
        !existentTeamNameList.includes(teamName) &&
          (await rootApi.fetchAddTeam(teamName));
        this.render();
      },
    });

    this.teamList = new TeamList({
      teamNameList,
      $targetTeamList,
    });
  }

  render() {
    this.teamList.render();
  }
}
