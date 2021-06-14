import { addMemberButtonTemplate, memberTemplate } from '../templates.js';

export default class MemberList {
  constructor({ onAddMember }) {
    this.$team = document.querySelector('.todoapp-list-container');

    this.$team.addEventListener('click', (event) => this.addMember(event, onAddMember));
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
}
