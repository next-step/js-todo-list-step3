import CreateElement from '../../../lib/CreateElement.js';
import { addTeamHandler } from '../../../eventHandler.js';

const AddTeam = (props) => {

  const dom = CreateElement('li', { className: 'add-team-button-container' });

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

