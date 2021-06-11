import Component from '../../lib/component.js';
import store from '../../store/index.js';
import api from '../../constant/api.js';
import teamCard from './presentational/teamCard.js';
import teamContainer from './presentational/teamContainer.js';
import { getIndex, getId } from '../../utils/utils.js';
import Kanban from '../kanban/kanban.js';

export default class Team extends Component {
  constructor($element, dataLoader) {
    super({
      store,
      $element,
    });
    this.dataLoader = dataLoader;
    this.kanban = new Kanban(document.querySelector('.kanban-view'), dataLoader);
    this.$element.insertAdjacentHTML('beforeend', teamContainer.template());
    this.setEvent();
    this.init();
  }

  setEvent = () => {
    const $addTeamButton = this.$element.querySelector('#add-team-button');

    $addTeamButton.addEventListener('click', async () => {
      const result = prompt('팀 이름을 입력해주세요').trim();
      if (result) {
        const body = {
          name: result
        }
        const team = await this.dataLoader.postData(api.teamURL, body);
        store.dispatch('addTeam', [team]);
      }
    });

    this.$element.addEventListener('click', async (event) => {
      const { target } = event;
      // card-delete처럼 '-' 가 붙은건 object literal로 어떻게 할까..?
      if (target.className === 'card-delete') {
        event.preventDefault();
        const index = getIndex(target.closest('.team-card-container').dataset);
        const id = getId(store.getState('teams')[index]);
        this.dataLoader.deleteData(api.deleteTeamURL(id));
        store.dispatch('clearTeam', { index });
      }
      if (['card', 'card-title'].includes(target.className)) {
        const index = getIndex(target.closest('.team-card-container').dataset);
        store.dispatch('setCurrentTeam', { currentTeam: store.getState('teams')[index] });
        this.toggleComponent(document.querySelector('.team-view'), document.querySelector('.kanban-view'));
      }
    });
  };

  toggleComponent = (blockComponent, noneComponent) => {
    blockComponent.style.display = 'none';
    noneComponent.style.display = 'block';
  }

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