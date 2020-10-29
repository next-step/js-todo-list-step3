import CreateElement from '../../lib/CreateElement.js';
import TodoInput from '../template/kanban/TodoInput.js';
import TodoList from '../template/kanban/TodoList.js';
import TodoFooter from '../template/kanban/TodoFooter.js';

const TodoApp = ({ memberId, todoList, todoClass }) => {

  return CreateElement(
    'div',
    {
      className: 'todoapp',
      dataset: {
        component: 'todoApp'
      }
    },
    TodoInput({ memberId }),
    TodoList({ todoList, memberId, todoClass }),
    TodoFooter({ todoClass }),
  );
};

export default TodoApp;