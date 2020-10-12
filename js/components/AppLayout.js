import STRINGS from '../constant/STRINGS.js';

const AppLayout = ({ children, ...props }) => {
  return `
  <div>
    <header>
      <h1 id="user-title" data-username=${'teamName'}>
        <span><strong>${'teamName'}</strong>${STRINGS.titlePostfix}</span>
      </h1>
    </header>
      ${ children }
  </div>`
};

export default AppLayout;