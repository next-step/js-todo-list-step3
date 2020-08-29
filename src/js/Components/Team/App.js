import TeamList from './TeamList.js';

import { api } from '../../utils/api/index.js';
import { SELECTOR } from '../../utils/constants.js';

function App({ $target }) {
  this.init = async () => {
    this.$target = $target;
    this.state = {
      teams: [],
      selectedTeam: '',
    };

    this.teamList = new TeamList({
      $target: document.querySelector(SELECTOR.TEAM_LIST),
      teamListState: this.state,
    });

    try {
      await this.fetchTeamList();
    } catch (err) {
      console.error(err);
    }
  };

  this.fetchTeamList = async () => {
    const teams = await api.team.fetchTeamList();

    this.setState({
      ...this.state,
      teams,
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.teamList.setState(this.state);
  };

  this.init();
}

export default App;
