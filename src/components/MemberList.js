import { KEY } from '../constants.js';
import { addMemberButtonTemplate, memberTemplate } from '../templates.js';

export default class MemberList {
  constructor({ onAddMember, onAddTodoItem }) {
    this.$team = document.querySelector('.todoapp-list-container');

    this.$team.addEventListener('click', (event) => this.addMember(event, onAddMember));
    this.$team.addEventListener('keydown', (event) => this.addTodoItem(event, onAddTodoItem));
  }

  render(members) {
    const template = members.map(memberTemplate);
    this.$team.innerHTML = template.join('') + addMemberButtonTemplate;
  }

  addMember(event, onAddMember) {
    const addMemberButtonTarget = event.target;
    if (addMemberButtonTarget.id !== 'add-user-button') return;
    onAddMember();
  }

  addTodoItem(event, onAddTodoItem) {
    if (event.key !== KEY.ENTER) return;

    const todoInputTarget = event.target;
    if (todoInputTarget.value === '') return;

    onAddTodoItem(todoInputTarget.id, todoInputTarget.value);
    todoInputTarget.value = '';
  }
}
