/* @jsx createElement */
import { createElement } from '../lib/React';

const TodoCount = ({ todos, onDeleteAll }) => {
  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>0</strong> 개
      </span>
      <ul className="filters">
        <li>
          <a href="#all" className="selected">
            전체보기
          </a>
        </li>
        <li>
          <a href="#priority">우선 순위</a>
        </li>
        <li>
          <a href="#active">해야할 일</a>
        </li>
        <li>
          <a href="#completed">완료한 일</a>
        </li>
      </ul>
      <button className="clear-completed" onclick={onDeleteAll}>
        모두 삭제
      </button>
    </div>
  );
};

export default TodoCount;
