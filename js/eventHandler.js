import STRINGS from './constant/STRINGS.js';
import { validateName } from './lib/validators.js';
import { dispatch, getter, setter } from './store/team.js';
import { postTeam } from './endpoint/team/controller.js';
import SortTodoListByPriority from './lib/SortTodoListByPriority.js';


export const addMemberHandler = async({ target }) => {
  if (!target.closest('#add-user-button')) return;

  const name = prompt(STRINGS.memberNamePromptMessage);
  if (name === null) return;

  const isValid = await validateName(name, addMemberHandler);
  if (!isValid) return;

  const teamId = getter.teamID();
  await dispatch.createTeamMember(teamId, name);
};

export const addTeamHandler = async() => {
  const name = prompt(STRINGS.teamNamePromptMessage);
  if (name === null) return;

  const isValid = await validateName(name, addTeamHandler);
  if (isValid) {
    await postTeam({ name });
    dispatch.teamList();
  }
};


export const updateTodoItemEventListener = ($target, eventType, component, callback) => {
  $target.addEventListener(eventType, async(event) => {
    const { target, target: { dataset } } = event;

    if (dataset?.component !== component) return;

    const teamId = getter.teamID();
    const itemId = target.closest('[data-component="todoItem"]').dataset.key;
    const memberId = target.closest('[data-component="userTodo"]').dataset.key;

    await callback({ teamId, itemId, memberId });
  });
};

export const addTodoItemHandler = async({ key, target, target: { value, dataset } }) => {
  if (!(
    value?.length
    && dataset?.component === 'todoInput'
    && key === 'Enter'
  )) return;

  const teamId = getter.teamID();
  const memberId = target.closest('li').dataset.key;
  const contents = value;
  target.value = '';
  await dispatch.createTodoItem(teamId, memberId, contents);
};

export const changeTodoEditModeHandler = ({ target, target: { dataset } }) => {
  if (dataset.component !== 'todoInfo') return;

  const todoView = target.closest('[data-component="todoView"]');
  const todoEdit = todoView.nextElementSibling;
  const todoContents = todoView.querySelector('[data-component="todoContents"]').innerText;

  todoEdit.value = todoContents;
  todoView.style.display = 'none';
  todoEdit.style.display = 'block';
  todoEdit.focus();
}

export const changeTodoViewModeHandler = ({ key, target, target: { dataset, value } }) => {
  if (dataset.component !== 'todoEdit' || key !== 'Escape') return;

  const originContents = value;
  const todoEdit = target;
  const todoView = todoEdit.previousElementSibling;

  target.value = originContents;
  todoView.style.display = 'block';
  todoEdit.style.display = 'none';
}

export const updateTodoContentHandler = async({ key, target, target: { value, dataset } }) => {
  if ( dataset.component !== 'todoEdit' || key !== 'Enter' || value === '') return;

  const todoEdit = target;
  const todoView = todoEdit.previousElementSibling;

  const teamId = getter.teamID();
  const itemId = target.closest('[data-component="todoItem"]').dataset.key;
  const memberId = target.closest('[data-component="userTodo"]').dataset.key;
  const contents = todoEdit.value;

  await dispatch.updateTodoItemContents({ teamId, memberId, itemId, contents })

  todoView.style.display = 'block';
  todoEdit.style.display = 'none';
}

export const updateTodoPriorityHandler = async ({ target, target: { dataset, value } }) => {
  if (dataset.component !== 'todoPriority') return;

  const teamId = getter.teamID();
  const itemId = target.closest('[data-component="todoItem"]').dataset.key;
  const memberId = target.closest('[data-component="userTodo"]').dataset.key;
  const priority = value;

  await dispatch.updateTodoItemPriority({ teamId, memberId, itemId, priority })
}

export const deleteAllTodoListHandler = async({ target, target: { dataset } }) => {
  if (dataset.component !== 'deleteAllTodoList') return;

  const memberId = target.closest('[data-component="userTodo"]').dataset.key;
  const teamId = getter.teamID();

  await dispatch.removeAllTodoList({ teamId, memberId });
}

export const changeFilterHandler = ({ target, target: { dataset, value }}) => {

  const button = target.closest('[data-component="todoClass"] li');
  if (!button) return;

  const filterKey = button.dataset.key;

  const { setTodoClass } = target.closest('[data-component="userTodo"]').state;
  const memberId = target.closest('[data-component="userTodo"]').dataset.key;
  const todoList = getter.memberTodoList(memberId);

  if (filterKey === 'priority') {
    const todoList = SortTodoListByPriority(memberId);
    setter.updateTodoList(memberId, todoList)
  }
  setTodoClass(filterKey);
}



