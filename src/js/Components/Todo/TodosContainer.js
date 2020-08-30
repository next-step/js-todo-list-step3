import { todoListHTML, addUserButtonHTML } from '../../utils/templates/user.js';
import { MESSAGE } from '../../utils/constants.js';

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
    const $li = e.target.closest('li');
    console.log(e.target);

    // 유저 추가
    if ($li.classList.contains('add-user-button-container')) {
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

  this.createContainerHTML = (members) => {
    return (
      members.reduce((html, member) => {
        html += this.createTodoListHTML(member);
        return html;
      }, '') + addUserButtonHTML()
    );
  };

  this.createTodoListHTML = (member) =>
    todoListHTML(member.name, member.todoList, 'all');

  this.render = () => {
    this.$target.innerHTML = this.createContainerHTML(this.members);
  };

  this.init();
}

export default TodosContainer;
