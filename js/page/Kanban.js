import CreateElement from '../lib/CreateElement.js';
import AddUser from '../components/kanban/AddUser.js';
import UserTodoContainer from '../components/kanban/UserTodoContainer.js';
import { dispatch } from '../store/team.js';

const Kanban = (props) => {
  dispatch.team(history.state.id);

  const dom = CreateElement('ul', { className: 'todoapp-list-container flex-column-container ' });
  const render = () => {
    dom.append(
      UserTodoContainer(),
      AddUser(),
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
