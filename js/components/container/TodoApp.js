import CreateElement from '../../lib/CreateElement.js';
import TodoInput from '../template/kanban/TodoInput.js';
import TodoList from '../template/kanban/TodoList.js';
import TodoFooter from '../template/kanban/TodoFooter.js';

const TodoApp = ({ _id, todoList, todoClass }) => {
  // todo List filter

  return CreateElement(
    'div',
    { className: 'todoapp' },
    TodoInput({ _id }),
    TodoList({ todoList }),
    TodoFooter({ todoClass }),
  );
};

export default TodoApp;