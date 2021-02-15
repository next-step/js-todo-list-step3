import { api } from '../../api/api.js';
import { ERR_MSG, MSG, TODO } from '../../utils/constant.js';
import { loadMembers } from './loadMembers.js';

export const addMember = async (currentTeam) => {
  const memberNameInput = window.prompt(MSG.ENTER_NEW_MEMBER_NAME);

  if (!memberNameInput) {
    return;
  }

  const memberName = memberNameInput.trim();

  if (memberName < TODO.MIN_MEMBER_NAME_LEN) {
    return alert(ERR_MSG.TOO_SHORT_MEMBER_NAME_LEN);
  }

  try {
    await api.addMember(currentTeam.id, memberName);
    loadMembers();
  } catch (err) {
    throw new Error(err);
  }
};
