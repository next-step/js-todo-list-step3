import api from './utils/api.js';
import { $TEAM_LIST_CONTAINER } from './utils/htmlElements.js';
import { TeamList } from './components/index.js';

class App {
  constructor() {
    this.initTeamList();
  }

  async initTeamList() {
    // await api.deleteTeam('x2wb9oSGL');
    this.teamListData = await api.fetchTeamList();
    this.teamList = new TeamList({
      $element: $TEAM_LIST_CONTAINER,
      teamList: this.teamListData,
      onAddTeam: async () => {
        const newTeamList = await api.fetchTeamList();
        this.setState(newTeamList);
      }
    });
  }

  setState(newTeamList) {
    this.teamListData = newTeamList;
    this.teamList.setState(this.teamListData);
  }
}

new App();
