function App() {
  const $todoApps = document.querySelector('.todoapp-list-container')
  $todoApps.addEventListener('click', e => {
    const $target = e.target
    const targetClassList = $target.classList
    if (targetClassList.contains('chip')) {
      const $chipSelect = $target.closest('.chip-container').querySelector('select')
      $target.classList.add('hidden')
      $chipSelect.classList.remove('hidden')
    }
  })

  const $addUserButton = document.querySelector('#add-user-button')
  $addUserButton.addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요')
  })
}

new App()
