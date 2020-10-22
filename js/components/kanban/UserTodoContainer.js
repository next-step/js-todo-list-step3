import CreateElement from '../../lib/CreateElement.js';
import TodoTitle from './TodoTitle.js';
import TodoApp from './TodoApp.js';

const UserTodoContainer = ({ getMember, setMember }) => {
  const dom = CreateElement('li', { className: 'todoapp-container' });
  const render = () => {
    const { _id, name, todoList } = getMember(render);
    dom.innerHTML = '';
    dom.append(
      TodoTitle({ name }),
      TodoApp({ _id, todoList }),
    );
  };
  render();

  return dom;
};

export default UserTodoContainer;