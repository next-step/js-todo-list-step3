import TeamTitle from './TeamTitle.js';

import { api } from '../../utils/api/index.js';
import { SELECTOR } from '../../utils/constants.js';

function App({ $target, teamId }) {
  this.init = async () => {
    this.$target = $target;
    this.state = {
      _id: teamId,
      members: [],
      name: '',
    };

    this.state.members.forEach(({ _id, name, todoList }) => {});
    this.state = await api.team.fetchTeam(teamId);

    const teamTitle = new TeamTitle({
      $target: document.querySelector(SELECTOR.TEAM_TITLE),
      name: this.state.name,
    });
  };

  this.init();
}

export default App;
