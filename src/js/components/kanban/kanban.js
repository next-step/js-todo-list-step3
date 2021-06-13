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
import addMemberButton from "./presentational/addMemberButton.js";
import api from "../../constant/api.js";

export default class Kanban extends Component {
  constructor($element, dataLoader) {
    super({
      store,
      $element
    })
    this.dataLoader = dataLoader;
    this.teamHeader = new TeamHeader(this.$element.querySelector('#user-title'));
    this.setEvent();
  }
  setEvent = () => {
    this.$element.addEventListener('click', async ({ target }) => {
      if (target.className === 'destroy') {
        const { _id: teamId, members } = store.getState('currentTeam');
        const index = target.closest('.todoapp-container').dataset['index'];
        const { _id: memberId, todoList } = members[index];
        const itemIndex = target.closest('.todo-list-item').dataset['index'];
        const res = await this.dataLoader.deleteData(api.deleteTodoItemURL(teamId, memberId, todoList[itemIndex]._id));
        store.dispatch('clearTodoItem', { memberIndex: index, itemIndex });
      } else if (['ripple', 'material-icons'].includes(target.className)) {
        let name = prompt('새로운 팀원 이름을 입력해주세요');
        name && name.trim();
        if (name && name.length > 2) {
          const body = { name };
          const { _id: teamId } = store.getState('currentTeam');
          const res = await this.dataLoader.postData(api.addMemberURL(teamId), body);
          store.dispatch('addMember', res);
        }
      }
    })

    this.$element.addEventListener('keydown', async ({ target, key }) => {
      if (key !== 'Enter' || key === 'Escape') return;
      const contents = target.value.trim();
      if (contents && contents.length > 2) {
        const { _id: teamId, members } = store.getState('currentTeam');
        const index = target.closest('.todoapp-container').dataset['index'];
        const body = { contents };
        const todoList = await this.dataLoader.postData(api.addTodoItemURL(teamId, members[index]._id), body);
        store.dispatch('addTodoItem', { todoList, index });
        target.value = '';
      }
    })
  }

  render = () => {
    const $container = this.$element.querySelector('.todoapp-list-container');
    $container.innerHTML = '';
    const { members } = store.getState('currentTeam');
    const template = members
    .map((member, index) => todoApp.template(member, index))
    .join('') + addMemberButton.template;
    $container.insertAdjacentHTML('beforeend', template);
  }
}
