import { postTeam } from '../../../endpoint/team/controller.js';
import { validateName } from '../../../lib/validators.js';
import { dispatch } from '../../../store/team.js';
import CreateElement from '../../../lib/CreateElement.js';
import STRINGS from '../../../constant/STRINGS.js';

const AddTeam = (props) => {

  const dom = CreateElement('li', { className: 'add-team-button-container' });

  const addTeamHandler = async () => {
      const name = prompt(STRINGS.teamNamePromptMessage);
      if (name === null) return;

      const isValid = await validateName(name, addTeamHandler);
      if (isValid) {
        await postTeam({ name });
        dispatch.teamList();
      }
  };

  dom.addEventListener('click', addTeamHandler);

  const render = () => {
    dom.innerHTML = `
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  };
  render();
  return dom;
};

export default AddTeam;

