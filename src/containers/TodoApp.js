/* @jsx createElement */
import { createElement } from '../lib/React';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoCount from '../components/TodoCount';
import { store } from '..';
import { addTodo, deleteAllTodo, deleteTodo } from './../modules/member/thunk';
import { useSelector } from '../lib/Redux';

const TodoApp = ({ member }) => {
  const { selectedTeam } = useSelector((state) => state.team);

  const onCreate = (e) => {
    store.dispatch(addTodo(selectedTeam._id, member._id, e.target.value));
  };

  const onDelete = (itemId) => {
    store.dispatch(deleteTodo(selectedTeam._id, member._id, itemId));
  };

  const onDeleteAll = () => {
    store.dispatch(deleteAllTodo(selectedTeam._id, member._id));
  };

  return (
    <div className="todoapp">
      <TodoInput onCreate={onCreate} />
      <TodoList todos={member.todoList} onDelete={onDelete} />
      <TodoCount todos={member.todoList} onDeleteAll={onDeleteAll} />
    </div>
  );
};

export default TodoApp;
