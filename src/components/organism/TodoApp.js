/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoFooter, TodoList, TodoForm } from 'components';
import { useSelector } from '../../lib/reducs';
import {
  Interactions,
  PRIORITY_ENUM,
  PRIORITY_SORT,
  FILTER_STATUS,
  keyCode,
} from 'utils';
import { store } from '../..';
import {
  addTodoAsync,
  deleteTodoAsync,
  toggleTodoAsync,
  deleteAllTodoAsync,
  setPriorityTodoAsync,
  startEdit,
  cancelEdit,
  confirmEdit,
  changeFilterMode,
} from '../../reducs/module/todo';

function TodoApp({ member }) {
  const { editingId, selectedTeam } = useSelector(state => state.team);
  const { _id: teamId } = selectedTeam;
  const { _id: memberId, todoList, mode } = member;

  const onAddTodo = (() => {
    let isSubmitting = false;

    return async function onAddTodo(e) {
      e.preventDefault();

      if (isSubmitting) return;
      isSubmitting = true;

      const contents = e.target.elements['new-todo'].value.trim();

      if (contents.length < 2) {
        Interactions.warnTodo(contents);
        isSubmitting = false;
        return;
      }

      store.dispatch(addTodoAsync(teamId, memberId, { contents }));

      isSubmitting = false;
    };
  })();

  const onToggleTodo = e => {
    if (!e.target.matches('.toggle')) return;

    const { id: todoId } = e.target.closest('li');

    store.dispatch(toggleTodoAsync(teamId, memberId, todoId));
  };

  const onDeleteTodo = e => {
    if (!e.target.matches('.destroy')) return;
    if (!Interactions.confirmDelete()) return;

    const { id: todoId } = e.target.closest('li');
    console.warn(todoId);
    store.dispatch(deleteTodoAsync(teamId, memberId, todoId));
  };

  const onDeleteAllTodos = async () => {
    if (!todoList.length) {
      Interactions.noTodos();
      return;
    }

    const answer = Interactions.confirmDeleteAll();
    if (!answer) return;

    store.dispatch(deleteAllTodoAsync(teamId, memberId));
  };

  const onSetPriority = async e => {
    const { id: todoId } = e.target.closest('li');
    const priority = PRIORITY_ENUM.get(e.target.selectedIndex); // select node

    store.dispatch(
      setPriorityTodoAsync(teamId, memberId, todoId, { priority })
    );
  };

  const onStartEditTodo = async e => {
    const { id: editingId } = e.target.closest('li');

    store.dispatch(startEdit(editingId));
  };

  const onConfirmEditTodo = async e => {
    if (!(keyCode.isEnter(e) || keyCode.isEscape(e))) return;

    if (keyCode.isEscape(e)) {
      store.dispatch(cancelEdit());
      return;
    }

    const { id: todoId } = e.target.closest('li');
    const contents = e.target.value;

    if (!contents) {
      store.dispatch(cancelEdit());
      return;
    }

    store.dispatch(confirmEdit(teamId, memberId, todoId, { contents }));
  };

  const onChangMode = async e => {
    const targetMode = e.target.classList[0];
    store.dispatch(changeFilterMode(memberId, targetMode));
  };

  const todosTobeRendered =
    mode !== 'priority'
      ? todoList?.filter(by(mode)) || []
      : [...todoList].sort(
          (todoA, todoB) =>
            PRIORITY_SORT.get(todoB.priority) -
            PRIORITY_SORT.get(todoA.priority)
        );

  return (
    <li className="todoapp-container">
      <h2>
        <span>
          <strong>{member.name}</strong>&apos;s Todo List
        </span>
      </h2>
      <div className="todoapp">
        <TodoForm onsubmit={onAddTodo} />
        <TodoList
          todoList={todosTobeRendered}
          editingId={editingId}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onSetPriority={onSetPriority}
          onStartEdit={onStartEditTodo}
          onConfirmEdit={onConfirmEditTodo}
        />
        <TodoFooter
          mode={mode}
          length={todoList?.length}
          onChangMode={onChangMode}
          onDeleteAll={onDeleteAllTodos}
        />
      </div>
    </li>
  );
}

const by = mode => todo => {
  switch (mode) {
    case FILTER_STATUS.ALL:
      return todo;
    case FILTER_STATUS.ACTIVE:
      return !todo.isCompleted;
    case FILTER_STATUS.COMPLETED:
      return todo.isCompleted;
  }
};

export default TodoApp;
