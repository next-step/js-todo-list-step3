import TodoTitle from './TodoTitle.js';
import TodoApp from '../../container/TodoApp.js';
import CreateElement from '../../../lib/CreateElement.js';
import { useState } from '../../../lib/state.js';
import { deleteAllTodoListHandler } from '../../../eventHandler.js';

const UserTodo = ({ getMember }) => {
  const { _id } = getMember();
  const [todoClass, setTodoClass] = useState('all');

  const dom = CreateElement(
    'li',
    {
      className: 'todoapp-container',
      dataset: {
        component: 'todoApp',
        key: _id,
      },
    },
  );

  dom.addEventListener('click', (event) => deleteAllTodoListHandler(setTodoClass, event));

  const render = () => {
    dom.innerHTML = '';
    const { name, _id, todoList } = getMember(render);
    dom.append(
      TodoTitle({ name }),
      TodoApp({ _id, todoList, todoClass }),
    );
  };
  render();

  return dom;
};

export default UserTodo;