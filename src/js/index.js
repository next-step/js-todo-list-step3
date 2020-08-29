import { default as TeamApp } from './Components/Team/App.js';

import { SELECTOR } from './utils/constants.js';

try {
  const pathname = location.pathname;
  if (pathname.includes('/index.html')) {
    new TeamApp({
      $target: document.querySelector(SELECTOR.APP),
    });
  }
} catch (err) {
  console.error(err);
}
