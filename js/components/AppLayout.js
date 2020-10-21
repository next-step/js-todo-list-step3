import Header from './Header.js';

const AppLayout = ({ children }) => {
  const dom = document.createElement('div');
  const render = () => {
    dom.innerHTML = ``;
    dom.append(
      Header(),
      children(),
    );
  };
  render();
  return dom;
};

export default AppLayout;