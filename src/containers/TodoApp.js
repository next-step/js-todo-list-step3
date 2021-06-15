/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoCount from '../components/TodoCount';
import { store } from '..';
import {
  addTodo,
  changeMode,
  deleteAllTodo,
  deleteTodo,
  toggleTodo,
} from './../modules/member/thunk';
import { useSelector } from '../lib/Redux';

const TodoApp = ({ member }) => {
  const { selectedTeam } = useSelector((state) => state.team);

  const onCreate = (e) => {
    store.dispatch(addTodo(selectedTeam._id, member._id, e.target.value));
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

  const onChangeMode = (mode) => {
    store.dispatch(changeMode(member._id, mode));
  };

  return (
    <div className="todoapp">
      <TodoInput onCreate={onCreate} />
      <TodoList
        todos={member.todoList}
        onDelete={onDelete}
        onToggle={onToggle}
        mode={member.mode}
      />
      <TodoCount
        todos={member.todoList}
        mode={member.mode}
        onDeleteAll={onDeleteAll}
        onChangeMode={onChangeMode}
      />
    </div>
  );
};

export default TodoApp;
