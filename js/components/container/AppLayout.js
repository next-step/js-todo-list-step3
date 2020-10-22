import Header from '../template/Header.js';
import CreateElement from '../../lib/CreateElement.js';

const AppLayout = ({ children }) => (
  CreateElement('div',
    {},
    Header(),
    children(),
  )
);

export default AppLayout;