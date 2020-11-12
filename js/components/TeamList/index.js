import Component from '../../core/Component.js';
import TeamButton from './TeamButton.js';
import AddButton from './AddButton.js';
import State from '../../core/State.js';
import api from '../../api/ApiService.js';

export default class TeamList extends Component {
  #teams;
  #api;

  constructor($parent, props) {
    super($parent, props);

    props.setTitle('Team');
    this.initEventListener();
    this.#teams = new State([], this.render);
    this.loadTeams();
    this.render();
  }

  loadTeams = async () => {
    this.#teams.value = await api.getTeams();
  };

  addTeam = async (teamName) => {
    await api.addTeam(teamName);
    this.loadTeams();
  };

  initEventListener = () => {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      const $card = e.target.closest('.team-card-container>.card');
      if ($card) this.props.routeTo(`/kanban.html?id=${$card.id}`);
    });
  };

  render = () => {
    this.$target.innerHTML = '';
    this.#teams.value.forEach(({ _id, name }) => {
      new TeamButton(this.$target, {
        class: ['team-card-container'],
        _id,
        name,
      });
    });
    new AddButton(this.$target, {
      class: ['add-team-button-container'],
      addTeam: this.addTeam,
    });
  };
}
