import { api } from '../api.js';
import { $todoApps, $todoApp } from '../dom.js';
import { template } from '../template.js';
import { teamId } from './todo.js';
import { completeCheck } from './completeTodo.js';
import { todoCount } from './todoCount.js';

export const loadTodo = async () => {
  const team = await api.getTeam(teamId);
  const teamName = team.name;
  const members = team.members;

  const clearAllList = () => {
    while ($todoApps.firstChild) {
      $todoApps.lastChild.remove();
    }
  };

  const renderTeamName = (teamName) => {
    $todoApp.insertAdjacentHTML('afterbegin', template.teamTitle(teamName));
  };

  const renderTodoContainer = (memberId, memberName) => {
    $todoApps.insertAdjacentHTML('beforeend', template.todoAppContainer(memberId, memberName));
  };

  const renderButton = () => {
    $todoApps.insertAdjacentHTML('beforeend', template.addUserButton());
  };

  const renderItem = ($todoList, contents, id, priority) => {
    $todoList.insertAdjacentHTML('beforeend', template.todoItem(contents, id, priority));
  };

  renderTeamName(teamName);
  clearAllList();

  members.map((member) => {
    renderTodoContainer(member._id, member.name);
  });

  renderButton();

  const addTodoItem = () => {
    const teamElements = $todoApps.getElementsByClassName('todoapp-container');

    for (let i = 0; i < teamElements.length; i++) {
      const $todoList = teamElements[i].querySelector('.todo-list');
      const todoArr = members[i].todoList;

      if (todoArr !== null) {
        todoArr.map((item) => {
          renderItem($todoList, item.contents, item._id, item.priority);

          if (item.isCompleted) {
            const $todoItem = $todoList.lastChild;
            const $toggle = $todoItem.querySelector('.toggle');

            completeCheck($toggle, $todoItem);
          }
        });
      }

      //여기서 작업하는게 불안한데
      todoCount($todoList, 'all');
    }
  };

  addTodoItem();
};
