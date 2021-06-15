/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoCount from '../components/TodoCount';
import { store } from '..';
import {
  addTodo,
  changeFilter,
  changeMode,
  deleteAllTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from './../modules/member/thunk';
import { useSelector } from '../lib/Redux';
import key from '../constant/key';

const TodoApp = ({ member }) => {
  const { selectedTeam } = useSelector((state) => state.team);

  const onCreate = (e) => {
    store.dispatch(addTodo(selectedTeam._id, member._id, e.target.value));
  };

  const onUpdate = (e, itemId) => {
    if (e.key === key.ENTER) {
      store.dispatch(
        updateTodo(selectedTeam._id, member._id, itemId, e.target.value)
      );
    }

    if (e.key === key.ESC) onChangeMode(itemId);
  };

  const onDelete = (itemId) => {
    store.dispatch(deleteTodo(selectedTeam._id, member._id, itemId));
  };

  const onToggle = (itemId) => {
    store.dispatch(toggleTodo(selectedTeam._id, member._id, itemId));
  };

  const onDeleteAll = () => {
    store.dispatch(deleteAllTodo(selectedTeam._id, member._id));
  };

  const onChangeFilter = (mode) => {
    store.dispatch(changeFilter(member._id, mode));
  };

  const onChangeMode = (itemId) => {
    store.dispatch(changeMode(member._id, itemId));
  };

  return (
    <div className="todoapp">
      <TodoInput onCreate={onCreate} />
      <TodoList
        todos={member.todoList}
        onDelete={onDelete}
        onToggle={onToggle}
        onChangeMode={onChangeMode}
        onUpdate={onUpdate}
        mode={member.mode}
      />
      <TodoCount
        todos={member.todoList}
        mode={member.mode}
        onDeleteAll={onDeleteAll}
        onChangeFilter={onChangeFilter}
      />
    </div>
  );
};

export default TodoApp;
