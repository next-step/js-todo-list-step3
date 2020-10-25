import CreateElement from '../../../lib/CreateElement.js';
import { postMember } from '../../../endpoint/team/controller.js';
import { dispatch } from '../../../store/team.js';
import { validateName } from '../../../lib/validators.js';
import STRINGS from '../../../constant/STRINGS.js';

const AddUser = ({ teamId }) => {
  const dom = CreateElement('li', { className: 'add-user-button-container' });

  const addMemberHandler = async ({ target }) => {
    if (!target.closest('#add-user-button')) return;

    const name = prompt(STRINGS.memberNamePromptMessage);
    if (name === null) return;

    const isValid = await validateName(name, addMemberHandler);
    if (isValid) {
      await postMember({ teamId, name });
      dispatch.team(teamId);
    }
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