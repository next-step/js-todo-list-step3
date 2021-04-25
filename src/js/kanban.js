import { KanbanApp } from './app/KanbanApp.js';
import { TodoApp } from './app/TodoApp.js';
import { KanbanStore } from './store/KanbanStore.js';
import { TodoStore } from './store/TodoStore.js';

const _getUrlParams = () => {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str, key, value) => {
    params[key] = value;
  });
  return params;
};
const kanbanApp = new KanbanApp();
const kanbanStore = new KanbanStore(_getUrlParams().id, kanbanApp);
kanbanStore.init();

const todoApp = new TodoApp();
const todoStore = new TodoStore(kanbanStore, todoApp);
todoStore.init();
