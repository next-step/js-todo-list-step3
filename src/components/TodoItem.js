/* @jsx createElement */
import { createElement } from '../lib/React';

const TodoItem = ({ todo, onDelete, onToggle, onChangeMode, onUpdate }) => {
  const makeTodoClassName = () => {
    if (todo.isCompleted) {
      return todo.editMode ? 'completed editing' : 'completed';
    }
    return todo.editMode ? 'editing' : '';
  };

  return (
    <li
      className={`todo-list-item ${makeTodoClassName()}`}
      ondblclick={() => onChangeMode(todo._id)}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onchange={() => onToggle(todo._id)}
          checked={todo.isCompleted}
        />
        <label className="label">
          <div className="chip-container">
            <select className="chip select">
              <option value="0" selected>
                순위
              </option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
          </div>
          {todo.contents}
        </label>
        <button className="destroy" onclick={() => onDelete(todo._id)}></button>
      </div>
      <input
        className="edit"
        value={todo.contents}
        onkeyup={(e) => onUpdate(e, todo._id)}
      />
    </li>
  );
};

export default TodoItem;
