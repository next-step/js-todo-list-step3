/* @jsx createElement */
import { createElement } from 'react';
import Mode from '@/constant/todoFilter';
import { filterTodo } from '@/utils/filterTodo';

const TodoCount = ({ todos, mode, onDeleteAll, onChangeFilter }) => {
  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>{filterTodo(mode, todos).length}</strong> 개
      </span>
      <ul className="filters">
        <li onclick={() => onChangeFilter(Mode.ALL)}>
          <span className={`${mode === Mode.ALL ? 'selected' : ''}`}>
            전체보기
          </span>
        </li>
        <li onclick={() => onChangeFilter(Mode.PRIORITY)}>
          <span className={`${mode === Mode.PRIORITY ? 'selected' : ''}`}>
            우선 순위
          </span>
        </li>
        <li onclick={() => onChangeFilter(Mode.ACTIVE)}>
          <span className={`${mode === Mode.ACTIVE ? 'selected' : ''}`}>
            해야할 일
          </span>
        </li>
        <li onclick={() => onChangeFilter(Mode.COMPLETED)}>
          <span className={`${mode === Mode.COMPLETED ? 'selected' : ''}`}>
            완료한 일
          </span>
        </li>
      </ul>
      <button className="clear-completed" onclick={onDeleteAll}>
        모두 삭제
      </button>
    </div>
  );
};

export default TodoCount;
