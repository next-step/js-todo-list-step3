import TeamTitle from './TeamTitle.js';
import TodosContainer from './TodosContainer.js';

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

    this.state = await api.team.fetchTeam(teamId);

    this.teamTitle = new TeamTitle({
      $target: document.querySelector(SELECTOR.TEAM_TITLE),
      name: this.state.name,
    });

    this.todosContainer = new TodosContainer({
      $target: document.querySelector(SELECTOR.TODOS_CONTAINER),
      state: {
        teamId: this.state._id,
        members: this.state.members,
      },
      onAddUser: this.onAddUser,
      onToggleTodo: this.onToggleTodo,
      onDeleteTodo: this.onDeleteTodo,
      onAddTodo: this.onAddTodo,
    });
  };

  this.onAddUser = async (name) => {
    await api.user.addUser(this.state._id, name);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.onToggleTodo = async (userId, todoId) => {
    await api.user.toggleTodo(this.state._id, userId, todoId);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.onDeleteTodo = async (userId, todoId) => {
    await api.user.deleteTodo(this.state._id, userId, todoId);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.onAddTodo = async (userId, contents) => {
    await api.user.addTodo(this.state._id, userId, contents);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.todosContainer.setState({
      teamId: this.state.name,
      members: this.state.members,
    });
  };

  this.init();
}

export default App;
