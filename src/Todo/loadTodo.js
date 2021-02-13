import { api } from '../api.js';
import { $todoApps } from '../dom.js';
import { template } from '../template.js';
import { teamId } from './todo.js';

export const loadTodo = async () => {
  const team = await api.getTeam(teamId);
  const members = team.members;

  const clearAllList = () => {
    while ($todoApps.firstChild) {
      $todoApps.lastChild.remove();
    }
  };

  const renderTodo = (memberId, memberName) => {
    $todoApps.insertAdjacentHTML('beforeend', template.todoAppContainer(memberId, memberName));
  };

  const renderButton = () => {
    $todoApps.insertAdjacentHTML('beforeend', template.addUserButton());
  };

  clearAllList();

  members.map((member) => {
    renderTodo(member._id, member.name);
  });

  renderButton();

  // competed면 todoItem에 클래스 추가하게 코드짜야하는데 잠이오네유
  const completeCheck = (isCompleted) => {
    if (isCompleted) {
    }
  };

  const addTodoItem = (item) => {
    const teamElements = $todoApps.getElementsByClassName('todoapp-container');

    for (let i = 0; i < teamElements.length; i++) {
      const $todoList = teamElements[i].querySelector('.todo-list');
      const todoArr = members[i].todoList;

      if (todoArr !== null) {
        todoArr.map((item) => {
          $todoList.insertAdjacentHTML('beforeend', template.todoItem(item.contents, item._id));
        });
      }
    }
  };

  addTodoItem();
};
