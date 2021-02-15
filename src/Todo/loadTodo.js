import { api } from '../etc/api.js';
import { $todoApps, $todoApp } from '../etc/dom.js';
import { teamId } from './todo.js';
import { completeCheck } from './feature/completeTodo.js';
import { todoCount } from './feature/todoCount.js';
import { render } from './todoRender.js';

export const loadTodo = async () => {
  const team = await api.getTeam(teamId);
  const teamName = team.name;
  const members = team.members;

  const clearAllList = () => {
    while ($todoApps.firstChild) {
      $todoApps.lastChild.remove();
    }
  };

  const clearTeamName = () => {
    $todoApp.firstChild.remove();
  };

  clearTeamName();
  clearAllList();

  render.teamName(teamName);

  members.map((member) => {
    render.todoContainer(member._id, member.name);
  });

  render.button();

  const addTodoItem = () => {
    const teamElements = $todoApps.getElementsByClassName('todoapp-container');

    for (let i = 0; i < teamElements.length; i++) {
      const $todoList = teamElements[i].querySelector('.todo-list');
      const todoArr = members[i].todoList;

      if (todoArr !== null) {
        todoArr.map((item) => {
          render.item($todoList, item.contents, item._id, item.priority);

          if (item.isCompleted) {
            const $todoItem = $todoList.lastChild;
            const $toggle = $todoItem.querySelector('.toggle');

            completeCheck($toggle, $todoItem);
          }
        });
      }

      todoCount($todoList, 'all');
    }
  };

  addTodoItem();
};
