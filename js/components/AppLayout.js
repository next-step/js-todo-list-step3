import STRINGS from '../constant/STRINGS.js';
import CreateElement from '../lib/CreateElement.js';

const AppLayout = ({ children }) => {
  const dom = CreateElement('div');

  const render = () => {
    dom.innerHTML = `
    <header>
      <h1 id="user-title" data-username=${'teamName'}>
        <span><strong>${'teamName'}</strong>${STRINGS.titlePostfix}</span>
      </h1>
    </header>
    `;
    dom.appendChild(children);
  };

  render();

  return dom;
};

export default AppLayout;