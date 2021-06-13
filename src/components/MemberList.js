import { addMemberButtonTemplate, memberTemplate } from '../templates.js';

export default class MemberList {
  constructor() {
    this.$team = document.querySelector('.todoapp-list-container');
  }

  render(members) {
    const template = members.map(memberTemplate);
    this.$team.innerHTML = template.join('') + addMemberButtonTemplate;
  }
}
