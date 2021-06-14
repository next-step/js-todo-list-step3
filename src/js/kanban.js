import { $, $$, METHOD, API, baseUrl } from './util.js';

const $todoApps = $('.todoapp-list-container');
const urlParams = new URLSearchParams(location.search);

function App() {
  $todoApps.addEventListener('click', ({ target }) => {
    if (target.classList.contains('chip')) {
      const $chipSelect = target.closest('.chip-container').querySelector('select');
      target.classList.add('hidden');
      $chipSelect.classList.remove('hidden');
    }
  })

  const addUser = async (name, { MEMBERS }, { POST }) => {
    const teamId = urlParams.get('id');
    fetch(MEMBERS(teamId), {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })
  };

  const $addUserButton = $('#add-user-button')
  $addUserButton.addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요');
    if (result) addUser(result, API, METHOD);
  })
};

new App();
