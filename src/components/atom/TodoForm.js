/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function TodoForm({ onsubmit }) {
  return (
    <section className="input-container">
      <form onsubmit={onsubmit}>
        <input
          name="new-todo"
          className="new-todo"
          placeholder="할일을 추가하세요"
        />
      </form>
    </section>
  );
}

export default TodoForm;
