import TeamTitle from './TeamTitle.js';
import TodosContainer from './TodosContainer.js';

import { api } from '../../utils/api/index.js';
import { SELECTOR, CLASS_NAME } from '../../utils/constants.js';
import { checkTeamState, checkTarget } from '../../utils/validation.js';

function App({ $target, teamId }) {
  this.init = async () => {
    checkTarget($target);
    this.$target = $target;
    this.state = {
      _id: teamId,
      members: [],
      name: '',
    };

    try {
      this.state = await api.team.fetchTeam(teamId);
      checkTeamState(this.state);
    } catch (err) {
      console.error(err);
    }

    this.teamTitle = new TeamTitle({
      $target: document.querySelector(SELECTOR.TEAM_TITLE),
      name: this.state.name,
    });

    this.todosContainer = new TodosContainer({
      $target: document.querySelector(SELECTOR.TODOS_CONTAINER),
      members: this.state.members.map((member) => {
        return {
          ...member,
          selectedTab: CLASS_NAME.ALL,
        };
      }),
      onAddUser: this.onAddUser,
      onToggleTodo: this.onToggleTodo,
      onDeleteTodo: this.onDeleteTodo,
      onAddTodo: this.onAddTodo,
      onEditPriority: this.onEditPriority,
      onEditTodo: this.onEditTodo,
      onDeleteAllTodo: this.onDeleteAllTodo,
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

  this.onEditPriority = async (userId, todoId, priority) => {
    await api.user.editPriority(this.state._id, userId, todoId, priority);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.onEditTodo = async (userId, todoId, contents) => {
    await api.user.editTodo(this.state._id, userId, todoId, contents);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.onDeleteAllTodo = async (userId) => {
    await api.user.deleteAllTodo(this.state._id, userId);
    const state = await api.team.fetchTeam(this.state._id);

    this.setState(state);
  };

  this.setState = (nextState) => {
    checkTeamState(nextState);
    this.state = nextState;

    const todosContainerMembers = this.state.members.map((member, idx) => {
      return {
        ...member,
        selectedTab: this.todosContainer.members[idx]
          ? this.todosContainer.members[idx].selectedTab
          : CLASS_NAME.ALL,
      };
    });
    this.todosContainer.setState(todosContainerMembers);
  };

  this.init();
}

export default App;
