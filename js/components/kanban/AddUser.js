import CreateElement from '../../lib/CreateElement.js';

const AddUser = (props) => {
  const dom = CreateElement('li', { className: 'add-user-button-container' });

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