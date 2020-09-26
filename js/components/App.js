import Component from '../core/Component.js';
import { strToHTML } from '../utils/index.js';

export default class App extends Component {
  $target;
  #teams;
  #title = 'Team';

  constructor($target, props) {
    super($target, props);
  }

  initEventListener = () => {};
  render() {
    console.log('hi');
    this.$target.innerHTML = '';

    new TodoTitle($target, { title: this.#title });
    const $container = document.createElement('div');
    new Router($container);
    this.$target.appendChild($container);
  }
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
