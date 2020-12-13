import {store} from "./store";
import {increament} from "./store/module/counter.js";
import {increament1} from "./store/module/counter2.js";

export default function App() {
  // const $todoApps = document.querySelector('.todoapp-list-container')
  // $todoApps.addEventListener('click', e => {
  //   const $target = e.target
  //   const targetClassList = $target.classList
  //   if (targetClassList.contains('chip')) {
  //     const $chipSelect = $target.closest('.chip-container').querySelector('select')
  //     $target.classList.add('hidden')
  //     $chipSelect.classList.remove('hidden')
  //   }
  // })
  //
  // const $addUserButton = document.querySelector('#add-user-button')
  // $addUserButton.addEventListener('click', () => {
  //   const result = prompt('새로운 팀원 이름을 입력해주세요')
  // })

  // const hello1 = (action) => {
  //   console.log('11111111')
  //   return store.dispatch(action())
  // }
  store.dispatch(increament1);

  // store.dispatch(increament);

  const hello = store.getState();

  console.log(hello);
}

