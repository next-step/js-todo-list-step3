import TodoApp from '@components/TodoApp.js';

function handleLoadAfter() {
  new TodoApp();
  console.log('test');
}

window.addEventListener('load', handleLoadAfter);
