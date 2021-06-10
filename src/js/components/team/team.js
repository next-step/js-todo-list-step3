import Component from '../../lib/component.js';
import store from '../../store/index.js';
import api from '../../constant/api.js';
import teamCard from '../../components/team/presentaional/teamCard.js';
import { getIndex, getId } from '../../utils/utils.js';

export default class Team extends Component {
  constructor($element, dataLoader) {
    super({
      store,
      $element,
    });
    this.dataLoader = dataLoader;
    // team 안에서 kanban board를 생성하자.
    // this.kanban =
    this.$element.insertAdjacentHTML('beforeend', this.template());
    this.setEvent();
    this.init();
  }
  template = () => {
    return `
    <div class='team-card-list-container'></div>
      <div class='add-team-button-container'>
        <button id='add-team-button' class='ripple'>
          <span class='material-icons'>add</span>
        </button>
      </div>
    </div>
    `;
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
      if (target.className === 'card-delete') {
        event.preventDefault();
        const index = getIndex(target.closest('.team-card-container'));
        const id = getId(index, store.getState('teams'));
        this.dataLoader.deleteData(api.deleteTeamURL(id));
        store.dispatch('clearTeam', { index });
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