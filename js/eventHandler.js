import STRINGS from './constant/STRINGS.js';
import { validateName } from './lib/validators.js';
import { createMemberTodoItem, createTeamMember } from './endpoint/team/service.js';
import { dispatch, setter } from './store/team.js';
import { postTeam } from './endpoint/team/controller.js';

export const addMemberHandler = async(teamId, { target }) => {
  if (!target.closest('#add-user-button')) return;

  const name = prompt(STRINGS.memberNamePromptMessage);
  if (name === null) return;

  const isValid = await validateName(name, addMemberHandler);
  if (!isValid) return;
  const newTeamMembers = await createTeamMember({ teamId, name });
  setter.teamInfo(newTeamMembers);
};

export const addTeamHandler = async () => {
  const name = prompt(STRINGS.teamNamePromptMessage);
  if (name === null) return;

  const isValid = await validateName(name, addTeamHandler);
  if (isValid) {
    await postTeam({ name });
    dispatch.teamList();
  }
};

export const addTodoItemHandler = async(teamId, { key, target, target: { dataset, value } }) => {
  if (!(
    value?.length
    && dataset?.component === 'todoInput'
    && key === 'Enter'
  )) return;
  const memberId = target.closest('li').dataset.key;
  const contents = value;
  await createMemberTodoItem({ teamId, memberId, contents });
  target.value = '';
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
