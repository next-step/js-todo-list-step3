/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
