import { todoListHTML, addUserButtonHTML } from '../../utils/templates/user.js';
import { MESSAGE, CLASS_NAME, SELECTOR } from '../../utils/constants.js';

function TodosContainer({ $target, state, onAddUser }) {
  this.init = () => {
    this.$target = $target;
    const { teamId, members } = state;
    this.teamId = teamId;
    this.members = members;

    this.render();
    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    const $todoListContainer = e.target.closest(SELECTOR.TODO_LIST_CONTAINER);
    const $addUserButton = e.target.closest(SELECTOR.ADD_USER_BUTTON);

    if (!($todoListContainer || $addUserButton)) {
      return;
    }

    // 유저 추가
    if ($addUserButton) {
      const name = prompt(MESSAGE.INPUT_USER_NAME);

      if (!name || !name.trim().length) {
        alert(MESSAGE.NO_USER_NAME);
        return;
      }

      onAddUser(name);
      return;
    }

    // 투두 리스트 조작
  };

  this.setState = (nextState) => {
    const { teamId, members } = nextState;

    this.teamId = teamId;
    this.members = members;

    this.render();
  };

  this.createTodoListHTML = (member) => todoListHTML(member, 'all');

  this.createContainerHTML = (members) => {
    return (
      members.reduce((html, member) => {
        html += this.createTodoListHTML(member);
        return html;
      }, '') + addUserButtonHTML()
    );
  };

  this.render = () => {
    this.$target.innerHTML = this.createContainerHTML(this.members);
  };

  this.init();
}

export default TodosContainer;
