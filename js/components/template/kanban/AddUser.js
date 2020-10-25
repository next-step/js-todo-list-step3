import CreateElement from '../../../lib/CreateElement.js';
import { setter } from '../../../store/team.js';
import { validateName } from '../../../lib/validators.js';
import STRINGS from '../../../constant/STRINGS.js';
import { createTeamMember } from '../../../endpoint/team/service.js';

const AddUser = ({ teamId }) => {
  const dom = CreateElement('li', { className: 'add-user-button-container' });

  const addMemberHandler = async({ target }) => {
    if (!target.closest('#add-user-button')) return;

    const name = prompt(STRINGS.memberNamePromptMessage);
    if (name === null) return;

    const isValid = await validateName(name, addMemberHandler);
    if (!isValid) return;
    const newTeamMembers = await createTeamMember({ teamId, name });
    setter.teamInfo(newTeamMembers);
  };

  dom.addEventListener('click', addMemberHandler);

  const render = () => {
    dom.innerHTML = `
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  };
  render();

  return dom;
};

export default AddUser;