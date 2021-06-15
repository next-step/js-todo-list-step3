/* @jsx createElement */
import { createElement } from '../lib/React';
import Mode from '../constant/todoFilter';

const TodoCount = ({ todos, mode, onDeleteAll, onChangeMode }) => {
  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>{todos.length}</strong> 개
      </span>
      <ul className="filters">
        <li onclick={() => onChangeMode(Mode.ALL)}>
          <a href="#all" className={`${mode === Mode.ALL ? 'selected' : ''}`}>
            전체보기
          </a>
        </li>
        <li onclick={() => onChangeMode(Mode.PRIORITY)}>
          <a
            href="#priority"
            className={`${mode === Mode.PRIORITY ? 'selected' : ''}`}
          >
            우선 순위
          </a>
        </li>
        <li onclick={() => onChangeMode(Mode.ACTIVE)}>
          <a
            href="#active"
            className={`${mode === Mode.ACTIVE ? 'selected' : ''}`}
          >
            해야할 일
          </a>
        </li>
        <li onclick={() => onChangeMode(Mode.COMPLETED)}>
          <a
            href="#completed"
            className={`${mode === Mode.COMPLETED ? 'selected' : ''}`}
          >
            완료한 일
          </a>
        </li>
      </ul>
      <button className="clear-completed" onclick={onDeleteAll}>
        모두 삭제
      </button>
    </div>
  );
};

export default TodoCount;
