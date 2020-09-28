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
      this.props.routeTo('/kanban');
    });
  };

  render = () => {
    this.$target.innerHTML = '';
    new TeamButton(this.$target);
    new AddButton(this.$target);
  };
}
