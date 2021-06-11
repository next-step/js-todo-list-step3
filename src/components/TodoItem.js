/* @jsx createElement */
import { createElement } from '../lib/React';

const TodoItem = ({ todo }) => {
  return (
    <li className="todo-list-item">
      <div className="view">
        <input className="toggle" type="checkbox" />
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
          해야할 아이템
        </label>
        <button className="destroy"></button>
      </div>
      <input className="edit" value="완료된 타이틀" />
    </li>
  );
};

export default TodoItem;
