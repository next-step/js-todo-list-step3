/*@jsx Reilly.createElement */
import Reilly from 'reilly';

import { TodoItem } from 'components';

function TodoList(props) {
  const {
    todoList,
    editingId,
    onToggle,
    onDelete,
    onSetPriority,
    onStartEdit,
    onConfirmEdit,
  } = props;

  return (
    <section className="main">
      <ul className="todo-list">
        {todoList.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            editingId={editingId}
            onDelete={onDelete}
            onStartEdit={onStartEdit}
            onToggle={onToggle}
            onConfirmEdit={onConfirmEdit}
            onSetPriority={onSetPriority}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
