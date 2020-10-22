import CreateElement from '../../lib/CreateElement.js';
import TodoInput from '../template/kanban/TodoInput.js';
import TodoList from '../template/kanban/TodoList.js';
import TodoCount from '../template/kanban/TodoCount.js';

const TodoApp = ({ _id, todoList }) => {
  return CreateElement(
    'div',
    { className: 'todoapp' },
    TodoInput(),
    TodoList(),
    TodoCount(),
  );
};

export default TodoApp;