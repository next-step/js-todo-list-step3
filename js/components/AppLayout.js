import STRINGS from '../constant/STRINGS.js';

const AppLayout = ({ children }) => {
  const dom = document.createElement('div');
  const render = () => {
    dom.innerHTML = `
    <header>
      <h1 id="user-title" data-username=${'teamName'}>
        <span><strong>${'teamName'}</strong>${STRINGS.titlePostfix}</span>
      </h1>
    </header>
    `;
    dom.append(children());
  };
  render();
  return dom;
};

export default AppLayout;