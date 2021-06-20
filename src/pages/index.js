import TeamList from '../components/TeamList.js';
import { addTeamData, getTeamListData } from '../utils/api.js';

export default class Home {
  constructor() {
    this.teams = [];

    this.TeamList = new TeamList({
      onAddTeam: async () => {
        try {
          const name = prompt('추가할 팀 이름을 입력해주세요.');
          if (!name) return;

          await addTeamData({ name });
          await this.updateTeamList();
        } catch (error) {
          console.error(error);
        }
      },
    });

    this.init();
  }

  renderTeamList() {
    this.TeamList.render(this.teams);
  }

  async updateTeamList() {
    this.teams = await getTeamListData();
    this.renderTeamList();
  }

  async init() {
    await this.updateTeamList();
  }
}

new Home();
