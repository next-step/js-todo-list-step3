import TeamHeader from "./teamHeader.js";
import todoApp from "./presentational/todoApp.js";
import store from "../../store/index.js";
import Component from "../../lib/component.js";
import addMemberButton from "./presentational/addMemberButton.js";
import { clearTodoItemHandler, 
  addMemberHandler, 
  modifyTodoItemHandler, 
  changeFilterHandler, 
  addTodoItemHandler, 
  changeTodoItemContentsHandler, 
  editTodoItemHandler, 
  changeTodoItemPriorityHandler 
} from "../eventHandler/eventHandler.js";

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
        await clearTodoItemHandler(target, store, this.dataLoader);
      } else if (['ripple', 'material-icons'].includes(target.className)) {
        await addMemberHandler(target, store, this.dataLoader);
      } else if (target.className === 'toggle') {
        await modifyTodoItemHandler(target, store, this.dataLoader);
      } else if (target.className === 'clear-completed') {
        await clearTodoItemHandler(target, store, this.dataLoader);
      } else if (target.classList.contains('filter')) {
        changeFilterHandler(target, store);
      }
    })

    this.$element.addEventListener('keydown', async ({ target, key }) => {
      if (key !== 'Enter' && key !== 'Escape') return;
      let contents = target.value;
      contents && contents.trim();
      if (!contents || contents.length < 2) return;

      if (target.className === 'new-todo') {
        await addTodoItemHandler(target, store, this.dataLoader, contents);
      } else if (target.className === 'edit') {
        await changeTodoItemContentsHandler(target, store, this.dataLoader, contents, key);
      }
    })

    this.$element.addEventListener('dblclick', ({ target }) => {
      editTodoItemHandler(target);
    })

    this.$element.addEventListener('change', async ({ target }) => {
      if (target.classList.contains('chip')) {
        changeTodoItemPriorityHandler(target, store, this.dataLoader);
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
