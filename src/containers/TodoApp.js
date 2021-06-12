/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoCount from '../components/TodoCount';

const TodoApp = ({ member }) => {
  return (
    <div className="todoapp">
      <TodoInput />
      <TodoList todos={member.todoList} />
      <TodoCount todos={member.todoList} />
    </div>
  );
};

export default TodoApp;
