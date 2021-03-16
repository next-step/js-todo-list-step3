import { template } from '../etc/template.js';
import { $todoApp, $todoApps } from '../etc/dom.js';

export const render = {
  teamName: (teamName) => {
    $todoApp.insertAdjacentHTML('afterbegin', template.teamTitle(teamName));
  },

  todoContainer: (memberId, memberName) => {
    $todoApps.insertAdjacentHTML('beforeend', template.todoAppContainer(memberId, memberName));
  },

  button: () => {
    $todoApps.insertAdjacentHTML('beforeend', template.addUserButton());
  },

  item: ($todoList, contents, id, priority) => {
    $todoList.insertAdjacentHTML('beforeend', template.todoItem(contents, id, priority));
  },
};
