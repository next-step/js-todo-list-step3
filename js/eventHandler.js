import STRINGS from './constant/STRINGS.js';
import { validateName } from './lib/validators.js';
import { dispatch, getter } from './store/team.js';
import { postTeam } from './endpoint/team/controller.js';


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


export const updateTodoItemHandler = ($target, eventType, component, callback) => {
  $target.addEventListener(eventType, async(event) => {
    const { target, target: { dataset } } = event;

    if (dataset?.component !== component) return;

    const teamId = getter.teamID();
    const itemId = target.closest('li').dataset.key;
    const memberId = target.closest('[data-component="todoApp"]').dataset.key;

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


// dom.addEventListener('click', ({ target, target: { classList } }) => {
//   if (!classList.contains('chip')) return;
//
//   const $chipSelect = target.closest('.chip-container').querySelector('select');
//   classList.add('hidden');
//   $chipSelect.classList.remove('hidden');
// });

//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', e => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target.closest('.chip-container').querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })
