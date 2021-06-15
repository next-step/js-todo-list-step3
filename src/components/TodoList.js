/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoItem from './TodoItem';
import Mode from '../constant/todoFilter';

const TodoList = ({ todos, mode, onDelete, onToggle }) => {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos
          ?.filter((todo) => {
            if (mode === Mode.ALL) return true;
            // if (mode === Mode.PRIORITY) return
            if (mode === Mode.ACTIVE) return !todo.isCompleted;
            if (mode === Mode.COMPLETED) return todo.isCompleted;
          })
          .map((todo) => (
            <TodoItem todo={todo} onDelete={onDelete} onToggle={onToggle} />
          ))}
      </ul>
    </section>
  );
};

export default TodoList;
