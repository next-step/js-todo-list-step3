import CreateElement from '../lib/CreateElement.js';
import AddUser from '../components/template/kanban/AddUser.js';
import { dispatch, getter } from '../store/team.js';
import UserTodo from '../components/template/kanban/UserTodo.js';
import HashParse from '../lib/HashParse.js';
import {
  addTodoItemHandler,
  updateTodoItemHandler,
} from '../eventHandler.js';

const Kanban = (props) => {
  const { id } = HashParse(location.hash);
  const teamId = id;
  dispatch.team(teamId);

  const dom = CreateElement('ul', { className: 'todoapp-list-container flex-column-container' });

  dom.addEventListener('keypress', addTodoItemHandler);
  updateTodoItemHandler(dom, 'click', 'destroyButton', dispatch.removeTodoItem);
  updateTodoItemHandler(dom, 'click', 'todoItemToggleComplete', dispatch.updateTodoItemComplete);

  dom.addEventListener('dblclick', (event) => {
    const { target, target: { dataset } } = event;
    if (dataset.component !== 'todoContents') return;

    const todoItem = target.closest('[data-component="todoItem"]');
    const todoView = target.closest('[data-component="todoView"]');
    const todoEdit = todoView.nextElementSibling;

    todoView.style.display = 'none';
    todoEdit.style.display = 'block';

  });

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

