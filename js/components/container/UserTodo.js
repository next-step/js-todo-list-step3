import TodoApp from './TodoApp.js';
import CreateElement from '../../lib/CreateElement.js';
import TodoTitle from '../template/kanban/TodoTitle.js';

const UserTodo = ({ getMember, setMember }) => {
  const { _id, name, todoList } = getMember(UserTodo);

  return CreateElement(
    'li',
    { className: 'todoapp-container' },
    TodoTitle({ name }),
    TodoApp({ _id, todoList }),
  );
};

export default UserTodo;