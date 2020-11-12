import Component from '../../core/Component.js';
import State from '../../core/State.js';
import api from '../../api/ApiService.js';
import TodoList from './TodoList/index.js';
import AddMemberButton from './AddMemberButton.js';

export default class TeamContainer extends Component {
  #teamTodos;

  constructor($parent, props) {
    super($parent, props);

    this.#teamTodos = new State([], this.render);
    this.loadTeamTodos();
  }

  async loadTeamTodos() {
    const urlParams = new URLSearchParams(window.location.search);
    this.#teamTodos.value = await api.getTeam(urlParams.get('id'));
    this.props.setTitle(this.#teamTodos.value.name);
    this.render();
  }

  addTeamMember = async (memberName) => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');
    await api.addTeamMember(teamId, memberName);
    await this.loadTeamTodos();
  };

  render = () => {
    this.$target.innerHTML = '';
    this.#teamTodos.value.members.forEach((member) => {
      new TodoList(
        this.$target,
        { class: ['todoapp-container'], 'data-member-id': member._id, member },
        'li'
      );
    });
    new AddMemberButton(
      this.$target,
      {
        class: ['add-user-button-container'],
        addTeamMember: this.addTeamMember,
      },
      'li'
    );
  };
}
