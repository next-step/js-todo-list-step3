import STRINGS from '../constant/STRINGS.js';
import CreateElement from '../lib/CreateElement.js';
import { getter } from '../store/team.js';

const Header = (props) => {
  const dom = CreateElement('header');
  const render = () => {
    const teamName = getter.teamName(render);
    dom.innerHTML = `
      <h1 id="user-title" data-username=${teamName}>
        <span><strong>${teamName}</strong>${STRINGS.titlePostfix}</span>
      </h1>
    `;
  };
  render();
  return dom;
};

export default Header;
