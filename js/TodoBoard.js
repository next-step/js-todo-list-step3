export default class TodoBoard {
  constructor(params) {
    this.$todoAppList = document.querySelector('.todoapp-list-container');
    this.$addUserButton = document.querySelector('#add-user-button');
    this.init();
  }

  init() {
    this.addTodoListClickEvent();
    this.addNewMember();
  }

  addTodoListClickEvent() {
    $todoAppList.addEventListener('click', (e) => {
      const $target = e.target;
      const targetClassList = $target.classList;
      if (targetClassList.contains('chip')) {
        const $chipSelect = $target
          .closest('.chip-container')
          .querySelector('select');
        $target.classList.add('hidden');
        $chipSelect.classList.remove('hidden');
      }
    });
  }

  addNewMember() {
    this.$addUserButton.addEventListener('click', () => {
      const result = prompt('새로운 팀원 이름을 입력해주세요');
    });
  }
}
