import TeamList from './TeamList.js';

import { api } from '../../utils/api/index.js';
import { SELECTOR } from '../../utils/constants.js';
import { checkTeamAppState, checkTarget } from '../../utils/validation.js';

function App({ $target }) {
  this.init = async () => {
    checkTarget($target);
    this.$target = $target;
    this.state = {
      teams: [],
    };

    this.teamList = new TeamList({
      $target: document.querySelector(SELECTOR.TEAM_LIST),
      teams: this.state.teams,
      onAddTeam: this.onAddTeam,
      onDeleteTeam: this.onDeleteTeam,
    });

    try {
      await this.fetchTeamList();
    } catch (err) {
      console.error(err);
    }
  };

  this.fetchTeamList = async () => {
    const teams = (await api.team.fetchTeamList()) || [];

    this.setState({
      ...this.state,
      teams,
    });
  };

  this.onAddTeam = async (name) => {
    await api.team.addTeam(name);

    this.fetchTeamList();
  };

  this.onDeleteTeam = async (id) => {
    await api.team.deleteTeam(id);

    this.fetchTeamList();
  };

  this.setState = (nextState) => {
    checkTeamAppState(nextState);
    this.state = nextState;

    this.teamList.setState(this.state.teams);
  };

  this.init();
}

export default App;
