import Component from '../core/Component.js';
import Router from '../router/index.js';
import Title from '../components/Title.js';

export default class App extends Component {
  $target;
  #teams;
  title = 'Team';

  constructor($target) {
    super();
    this.$target = $target;
    this.render();
  }

  initEventListener() {}
  render = () => {
    new Title(this.$target, { id: 'user-title', title: this.title }, 'h1');
    new Router(this.$target);
  };
}

// function App() {
//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', e => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target.closest('.chip-container').querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })

//   const $addUserButton = document.querySelector('#add-user-button')
//   $addUserButton.addEventListener('click', () => {
//     const result = prompt('새로운 팀원 이름을 입력해주세요')
//   })
// }

// new App()
