import { addTeamData, getTeamListData } from '../api.js';
import TeamList from '../components/TeamList.js';

export default class Home {
  constructor() {
    this.teams = [];

    this.TeamList = new TeamList({
      onAddTeam: async () => {
        try {
          const name = prompt('추가할 팀 이름을 입력해주세요.');
          if (!name) return;

          await addTeamData({ name });
          this.init();
        } catch (error) {
          console.log(error);
        }
      },
    });

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
