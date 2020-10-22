import CreateElement from '../../../lib/CreateElement.js';

const TodoTitle = ({ name }) => {
  const dom = CreateElement('h2');

  const render = () => {
    dom.innerHTML = `
        <span><strong>${name}</strong>'s Todo List</span>
    `;
  };
  render();

  return dom;
};

export default TodoTitle;