import CreateElement from '../../../lib/CreateElement.js';
import { addMemberHandler } from '../../../eventHandler.js';

const AddUser = ({ teamId }) => {
  const dom = CreateElement('li', { className: 'add-user-button-container' });

  dom.addEventListener(
    'click',
    (event) => addMemberHandler(teamId, event)
  );

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