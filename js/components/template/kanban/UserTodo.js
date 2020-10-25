import TodoTitle from './TodoTitle.js';
import TodoApp from '../../container/TodoApp.js';
import CreateElement from '../../../lib/CreateElement.js';

const UserTodo = ({ getMember }) => {
  const { _id } = getMember();

  const dom = CreateElement(
    'li',
    { className: 'todoapp-container', dataset: { key: _id } },
  );

  const render = () => {
    dom.innerHTML = '';
    const { name, _id, todoList } = getMember(render);
    dom.append(
      TodoTitle({ name }),
      TodoApp({ _id, todoList }),
    );
  };
  render();

  return dom;
};

export default UserTodo;