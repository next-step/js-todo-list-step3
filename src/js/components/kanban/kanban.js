// function App() {
//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', e => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target.closest('.chip-container').querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })
//   const $addUserButton = document.querySelector('#add-user-button')
//   $addUserButton.addEventListener('click', () => {
//     const result = prompt('새로운 팀원 이름을 입력해주세요')
//   })
// }

import TeamHeader from "./teamHeader.js";
import todoApp from "./presentational/todoApp.js";
import store from "../../store/index.js";
import Component from "../../lib/component.js";
import api from "../../constant/api.js";

export default class Kanban extends Component {
  constructor($element, dataLoader) {
    super({
      store,
      $element
    })
    this.dataLoader = dataLoader;
    this.teamHeader = new TeamHeader(this.$element.querySelector('#user-title'));
  }
  setEvent = () => {

  }
  render = () => {
    const $container = this.$element.querySelector('.todoapp-list-container');
    $container.innerHTML = '';
    const { members } = store.getState('currentTeam');
    const template = members
    .map((member) => todoApp.template(member))
    .join('');
    $container.insertAdjacentHTML('beforeend', template);
  }
}
