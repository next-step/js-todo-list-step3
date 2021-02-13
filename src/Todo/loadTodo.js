import { api } from '../api.js';
import { $todoApps } from '../dom.js';
import { template } from '../template.js';
import { teamId } from './todo.js';
import { completeCheck } from './completeTodo.js';

export const loadTodo = async () => {
  const team = await api.getTeam(teamId);
  const members = team.members;

  const clearAllList = () => {
    while ($todoApps.firstChild) {
      $todoApps.lastChild.remove();
    }
  };

  const renderTodoContainer = (memberId, memberName) => {
    $todoApps.insertAdjacentHTML('beforeend', template.todoAppContainer(memberId, memberName));
  };

  const renderButton = () => {
    $todoApps.insertAdjacentHTML('beforeend', template.addUserButton());
  };

  const renderItem = ($todoList, contents, id, completed) => {
    $todoList.insertAdjacentHTML('beforeend', template.todoItem(contents, id, completed));
  };

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
          renderItem($todoList, item.contents, item._id);
          if (item.isCompleted) {
            const $todoItem = $todoList.lastChild;
            const $toggle = $todoItem.querySelector('.toggle');

            completeCheck($toggle, $todoItem);
          }
        });
      }
    }
  };

  addTodoItem();
};
