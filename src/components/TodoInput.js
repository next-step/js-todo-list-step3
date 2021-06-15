/* @jsx createElement */
import { createElement } from '../lib/React';

const TodoInput = ({ onCreate }) => {
  return (
    <section className="input-container">
      <input
        className="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus
        onchange={onCreate}
      />
    </section>
  );
};

export default TodoInput;
