import Component from "../../lib/component.js";
import store from '../../store/index.js';
import title from './presentational/userTitle.js';

export default class TeamHeader extends Component {
  constructor($element) {
    super({
      store,
      $element
    });
  }
  render = () => {
    const team = store.getState('currentTeam');
    const template = title.template(team.name);
    this.$element.innerHTML = '';
    this.$element.insertAdjacentHTML('beforeend', template);
  }
}