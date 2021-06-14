import Component from '../../lib/component.js';
import store from '../../store/index.js';
import api from '../../constant/api.js';
import teamCard from './presentational/teamCard.js';
import teamContainer from './presentational/teamContainer.js';
import Kanban from '../../kanban/components/kanban.js';
import { $ } from '../../utils/querySelector.js';
import { addTeamHandler, clearTeamHandler, setCurrentTeamHandler, toggleKanbanViewHandler } from '../eventHandler/eventHandler.js';

export default class Team extends Component {
  constructor($element, dataLoader) {
    super({
      store,
      $element,
    });
    this.dataLoader = dataLoader;
    this.kanban = new Kanban($('.kanban-view'), dataLoader);
    this.$element.insertAdjacentHTML('beforeend', teamContainer.template());
    this.setEvent();
    this.init();
  }

  setEvent = () => {
    const $addTeamButton = this.$element.querySelector('#add-team-button');

    $addTeamButton.addEventListener('click', async () => {
      await addTeamHandler(store, this.dataLoader);
    });

    this.$element.addEventListener('click', async () => {
      const { target } = event;
      if (target.className === 'card-delete') {
        event.preventDefault();
        await clearTeamHandler(target, store, this.dataLoader);
      }
      if (['card', 'card-title'].includes(target.className)) {
        setCurrentTeamHandler(target, store);
        toggleKanbanViewHandler($('.team-view'), $('.kanban-view'));
      }
    });
  };

  init = async () => {
    const res = await this.dataLoader.getData(api.teamURL);
    store.dispatch('addTeam', res);
  };

  render = () => {
    const $teamCardList = this.$element.querySelector('.team-card-list-container');
    const teams = store.getState('teams');
    const template = teams
    .map((team, index) => teamCard.template(team, index))
    .join('');
    $teamCardList.innerHTML = '';
    $teamCardList.insertAdjacentHTML('beforeend', template);
  };
}