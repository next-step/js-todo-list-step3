import api from '../utils/api.js';

export default class MemberAddButton {
  constructor({ $element, teamId, onClick }) {
    $element.addEventListener('click', async () => {
      const newMember = prompt('새로운 팀원을 입력해주세요.');
      if (newMember) {
        await api.addTeamMember(teamId, newMember);
        onClick();
      }
    });
  }
}
