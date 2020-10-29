import TodoTitle from './TodoTitle.js';
import TodoApp from '../../container/TodoApp.js';
import CreateElement from '../../../lib/CreateElement.js';
import { useState } from '../../../lib/state.js';

const UserTodo = ({ getMember }) => {
  const { _id } = getMember();
  const [todoClass, setTodoClass] = useState('all');
  const dom = CreateElement(
    'li',
    {
      className: 'todoapp-container',
      dataset: {
        component: 'userTodo',
        key: _id,
      },
    },
  );
  dom.state = {
    todoClass,
    setTodoClass
  }

  const render = () => {
    dom.innerHTML = '';
    const { name, _id, todoList } = getMember(render);

    dom.append(
      TodoTitle({ name }),
      TodoApp({ memberId: _id, todoList, todoClass }),
    );
  };
  render();

  return dom;
};

export default UserTodo;