import TeamHeader from "./teamHeader.js";
import todoApp from "./presentational/todoApp.js";
import store from "../../store/index.js";
import Component from "../../lib/component.js";
import addMemberButton from "./presentational/addMemberButton.js";
import api from "../../constant/api.js";
import { ALL } from "../../constant/constant.js";
import { convertToFilter, convertToPriority } from "../../utils/utils.js";

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
    const getTargetDatas = (target) => {
      const { _id: teamId, members } = store.getState('currentTeam');
      const memberIndex = target?.closest('.todoapp-container')?.dataset['index'];
      const { _id: memberId, todoList } = memberIndex ? members[memberIndex] : { _id: null };
      const itemIndex = target?.closest('.todo-list-item')?.dataset['index'];
      const { _id: itemId } = itemIndex ? todoList[itemIndex] : { _id: null };
      return { teamId, memberId, itemId, memberIndex, itemIndex, members };
    }

    this.$element.addEventListener('click', async ({ target }) => {
      if (target.className === 'destroy') {
        const { teamId, memberId, itemId, memberIndex, itemIndex } = getTargetDatas(target);
        await this.dataLoader.deleteData(api.deleteTodoItemURL(teamId, memberId, itemId));
        store.dispatch('clearTodoItem', { memberIndex, itemIndex });
      } else if (['ripple', 'material-icons'].includes(target.className)) {
        let name = prompt('새로운 팀원 이름을 입력해주세요');
        name && name.trim();
        if (!name || name.length < 2) return;
        const { teamId } = getTargetDatas(target);
        const body = { name };
        const res = await this.dataLoader.postData(api.addMemberURL(teamId), body);
        const { members } = res;
        const newMembers = members.map((member) => ({ ...member, filter: ALL }));
        res.members = newMembers;
        store.dispatch('addMember', res);
      } else if (target.className === 'toggle') {
        const { teamId, memberId, itemId, memberIndex, itemIndex } = getTargetDatas(target);
        const todoItem = await this.dataLoader.putData(api.toggleTodoItemURL(teamId, memberId, itemId), {});
        store.dispatch('modifyTodoItem', { memberIndex, itemIndex , todoItem });
      } else if (target.className === 'clear-completed') {
        const { teamId, memberId, memberIndex } = getTargetDatas(target);
        await this.dataLoader.deleteData(api.deleteTodoListURL(teamId, memberId));
        store.dispatch('clearTodoList', { memberIndex });
      } else if (target.classList.contains('filter')) {
        const { classList } = target;
        if (!classList.contains('priority') && classList.contains('selected')) return;
        const { memberIndex, members } = getTargetDatas(target);
        const copyMembers = [...members];
        if (classList.contains('priority') && classList.contains('selected')) {
          copyMembers[memberIndex].filter -= 3;
          store.dispatch('changeFilter', { memberIndex, members: copyMembers })
        } else if (classList.contains('priority')) {
          copyMembers[memberIndex].filter += 3;
        } else {
          const prev = copyMembers[memberIndex].filter >= 3 ? 3 : 0;
          copyMembers[memberIndex].filter = convertToFilter[classList[0]] + prev;
        }
        store.dispatch('changeFilter', { memberIndex, members: copyMembers })
      }
    })

    this.$element.addEventListener('keydown', async ({ target, key }) => {
      if (key !== 'Enter' && key !== 'Escape') return;
      let contents = target.value;
      contents && contents.trim();
      if (!contents || contents.length < 2) return;
      if (target.className === 'new-todo') {
        const { teamId, memberId, memberIndex } = getTargetDatas(target);
        const body = { contents };
        const todoItem = await this.dataLoader.postData(api.addTodoItemURL(teamId, memberId), body);
        store.dispatch('addTodoItem', { todoItem, memberIndex });
        target.value = '';
      } else if (target.className === 'edit') {
        const item = target.closest('.todo-list-item');
        if (key === 'Enter') {
          const { teamId, memberId, itemId, memberIndex, itemIndex } = getTargetDatas(target);
          const body = { contents };
          const todoItem = await this.dataLoader.putData(api.modifyTodoItemURL(teamId, memberId, itemId), body);
          store.dispatch('modifyTodoItem', { memberIndex, itemIndex , todoItem });
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

    this.$element.addEventListener('change', async ({ target }) => {
      if (target.classList.contains('chip')) {
        const { teamId, memberId, itemId, memberIndex, itemIndex } = getTargetDatas(target);
        const body = { priority: convertToPriority[target.value] }
        const todoItem = await this.dataLoader.putData(api.changeTodoItemPriorityURL(teamId, memberId, itemId), body);
        store.dispatch('modifyTodoItem', { memberIndex, itemIndex , todoItem });
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
