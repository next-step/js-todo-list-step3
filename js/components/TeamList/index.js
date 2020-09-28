import Component from '../../core/Component.js';
import TeamButton from './TeamButton.js';
import AddButton from './AddButton.js';

export default class TeamList extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.initEventListener();
    this.render();
  }

  initEventListener = () => {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.team-card-container'))
        this.props.routeTo('/kanban', { hi: 'hi' }, 'hi');
    });
  };

  render = () => {
    this.$target.innerHTML = '';
    new TeamButton(this.$target, { class: ['team-card-container'] });
    new AddButton(this.$target, { class: ['add-team-button-container'] });
  };
}
