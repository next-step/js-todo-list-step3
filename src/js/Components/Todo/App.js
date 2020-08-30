import { api } from '../../utils/api/index.js';

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
  };

  this.init();
}

export default App;
