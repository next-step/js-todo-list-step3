/* @jsx createElement */
import { createElement } from '../lib/React';
import priority from '../constant/priority';
import { useSelector } from './../lib/Redux';
import Skeleton from './Skeleton';

const TodoItem = ({
  todo,
  onDelete,
  onToggle,
  onChangeMode,
  onUpdate,
  onChangePriority,
}) => {
  const { loading } = useSelector((state) => state.member);
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
          {loading ? (
            <Skeleton />
          ) : (
            <fragment>
              <div className="chip-container">
                <select
                  className={`chip select ${todo.priority}`}
                  onchange={(e) => onChangePriority(e, todo._id)}
                >
                  <option
                    value={priority.NONE}
                    selected={todo.priority === priority.NONE ? true : false}
                  >
                    미지정
                  </option>
                  <option
                    value={priority.FIRST}
                    selected={todo.priority === priority.FIRST ? true : false}
                  >
                    1순위
                  </option>
                  <option
                    value={priority.SECOND}
                    selected={todo.priority === priority.SECOND ? true : false}
                  >
                    2순위
                  </option>
                </select>
              </div>
              {todo.contents}
            </fragment>
          )}
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
