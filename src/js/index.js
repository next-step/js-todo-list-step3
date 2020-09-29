import { default as TeamApp } from './Components/Team/App.js';
import { default as TodoApp } from './Components/Todo/App.js';

import { SELECTOR, QUERY } from './utils/constants.js';

try {
  const pathname = location.pathname;
  if (pathname.includes('/index.html')) {
    new TeamApp({
      $target: document.querySelector(SELECTOR.APP),
    });
  }

  if (pathname.includes('/kanban.html')) {
    const params = new URLSearchParams(location.search);
    new TodoApp({
      $target: document.querySelector(SELECTOR.APP),
      teamId: params.get(QUERY.ID),
    });
  }
} catch (err) {
  console.error(err);
}
