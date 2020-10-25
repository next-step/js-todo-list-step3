import CreateElement from '../lib/CreateElement.js';
import AddUser from '../components/template/kanban/AddUser.js';
import { dispatch, getter } from '../store/team.js';
import UserTodo from '../components/template/kanban/UserTodo.js';
import HashParse from '../lib/HashParse.js';
import { createMemberTodoItem } from '../endpoint/team/service.js';

const Kanban = (props) => {
  const { id } = HashParse(location.hash);
  const teamId = id;
  dispatch.team(teamId);

  const dom = CreateElement('ul', { className: 'todoapp-list-container flex-column-container' });

  const AddTodoItemHandler = async({ key, target, target: { dataset, value } }) => {
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

  dom.addEventListener('keypress', AddTodoItemHandler);

  const render = () => {
    const teamMembers = getter.teamMembers(render);
    dom.innerHTML = '';
    if (teamMembers) {
      const teamMembersDom = Array.from(teamMembers,
        ([key, [getMember]]) => UserTodo({ getMember }));
      dom.append(...teamMembersDom);
    }
    dom.append(
      AddUser({ teamId }),
    );
  };
  render();

  return dom;
};

export default Kanban;

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
