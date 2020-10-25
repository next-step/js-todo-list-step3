import CreateElement from '../lib/CreateElement.js';
import AddUser from '../components/template/kanban/AddUser.js';
import { dispatch, getter } from '../store/team.js';
import UserTodo from '../components/container/UserTodo.js';

const Kanban = (props) => {
  const teamId = history.state.id;
  dispatch.team(teamId);

  const dom = CreateElement('ul', { className: 'todoapp-list-container flex-column-container' });

  const render = () => {
    const teamMembers = getter.teamMembers(render);
    dom.innerHTML = '';
    if (teamMembers) {
      const teamMembersDom = Array.from(teamMembers,
        ([key, [getMember, setMember]]) => UserTodo({ getMember, setMember }));
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
