/* @jsx createElement */
import { createElement } from '../lib/React';
import { filterTodo } from '../utils/filterTodo';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  mode,
  onDelete,
  onToggle,
  onChangeMode,
  onUpdate,
  onChangePriority,
}) => {
  return (
    <section className="main">
      <ul className="todo-list">
        {filterTodo(mode, todos).map((todo) => (
          <TodoItem
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onChangeMode={onChangeMode}
            onUpdate={onUpdate}
            onChangePriority={onChangePriority}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
