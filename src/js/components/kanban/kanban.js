import TeamHeader from "./teamHeader.js";
import todoApp from "./presentational/todoApp.js";
import store from "../../store/index.js";
import Component from "../../lib/component.js";
import addMemberButton from "./presentational/addMemberButton.js";
import api from "../../constant/api.js";
import { ALL } from "../../constant/constant.js";

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
        await this.dataLoader.deleteData(api.deleteTodoItemURL(teamId, memberId, todoList[itemIndex]._id));
        store.dispatch('clearTodoItem', { memberIndex: index, itemIndex });
      } else if (['ripple', 'material-icons'].includes(target.className)) {
        let name = prompt('새로운 팀원 이름을 입력해주세요');
        name && name.trim();
        if (!name || name.length < 2) return;
        const body = { name };
        const { _id: teamId } = store.getState('currentTeam');
        const res = await this.dataLoader.postData(api.addMemberURL(teamId), body);
        const { members } = res;
        const newMembers = members.map((member) => ({ ...member, filter: ALL }));
        res.members = newMembers;
        store.dispatch('addMember', res);
      }
    })

    this.$element.addEventListener('keydown', async ({ target, key }) => {
      if (key !== 'Enter' && key !== 'Escape') return;
      let contents = target.value;
      contents && contents.trim();
      if (!contents || contents.length < 2) return;
      if (target.className === 'new-todo') {
        const { _id: teamId, members } = store.getState('currentTeam');
        const index = target.closest('.todoapp-container').dataset['index'];
        const body = { contents };
        const todoItem = await this.dataLoader.postData(api.addTodoItemURL(teamId, members[index]._id), body);
        store.dispatch('addTodoItem', { todoItem, index });
        target.value = '';
      } else if (target.className === 'edit') {
        const item = target.closest('.todo-list-item');
        if (key === 'Enter') {
          const { _id: teamId, members } = store.getState('currentTeam');
          const index = target.closest('.todoapp-container').dataset['index'];
          const { _id: memberId, todoList } = members[index];
          const itemIndex = target.closest('.todo-list-item').dataset['index'];
          const body = { contents };
          const todoItem = await this.dataLoader.putData(api.modifyTodoItemURL(teamId, memberId, todoList[itemIndex]._id), body);
          store.dispatch('modifyTodoItem', { memberIndex: index, itemIndex , todoItem });
        }
        item.classList.remove('editing');
      }
    })

    this.$element.addEventListener('dblclick', ({ target }) => {
      if (target.className === 'label') {
        const item = target.closest('.todo-list-item');
        item.classList.add('editing');
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
