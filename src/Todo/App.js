import {$todoApps, $addUserButton} from '../dom.js';

function App() {
  $todoApps.addEventListener('click', e => {
    const $target = e.target
    const targetClassList = $target.classList
    if (targetClassList.contains('chip')) {
      const $chipSelect = $target.closest('.chip-container').querySelector('select')
      $target.classList.add('hidden')
      $chipSelect.classList.remove('hidden')
    }
  })

  $addUserButton.addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요')
  })
}

new App()
