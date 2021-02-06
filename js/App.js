import { teamTemplateHTML } from './template.js';

import { addUser } from './AddUser.js';

const $todoApps = document.querySelector('.todoapp-list-container')

$todoApps.addEventListener('click', event => notUnderstoodYet(event));

const notUnderstoodYet = event => {
  const $target = event.target;
  const targetClassList = $target.classList;
  if (targetClassList.contains('chip')) {
    const $chipSelect = $target.closest('.chip-container').querySelector('select');
    $target.classList.add('hidden');
    $chipSelect.classList.remove('hidden');
  }
}