import CreateElement from '../lib/CreateElement.js';
import AddUser from '../components/template/kanban/AddUser.js';
import { dispatch, getter } from '../store/team.js';
import UserTodo from '../components/template/kanban/UserTodo.js';
import HashParse from '../lib/HashParse.js';
import {
  addTodoItemHandler, todoContentUpdateHandler, todoEditModeHandler, todoViewModeHandler,
  updateTodoItemEventListener,
} from '../eventHandler.js';

const Kanban = (props) => {
  const { id } = HashParse(location.hash);
  const teamId = id;
  dispatch.team(teamId);

  const dom = CreateElement('ul', { className: 'todoapp-list-container flex-column-container' });

  dom.addEventListener('keypress', addTodoItemHandler);
  dom.addEventListener('dblclick', todoEditModeHandler);
  dom.addEventListener('keyup', todoViewModeHandler);
  dom.addEventListener('keypress', todoContentUpdateHandler);
  updateTodoItemEventListener(dom, 'click', 'destroyButton', dispatch.removeTodoItem);
  updateTodoItemEventListener(dom, 'click', 'todoItemToggleComplete', dispatch.updateTodoItemComplete);


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

