/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoCount from '../components/TodoCount';

const TodoApp = () => {
  return (
    <div className="todoapp">
      <TodoInput />
      <TodoList todos={todos} />
      <TodoCount todos={todos} />
    </div>
  );
};

export default TodoApp;
