import { todoInput } from './todoInput.js';
import { $todoApps } from '../dom.js';

export const todo = () => {
  console.log($todoApps);
  //이벤트가 발동을 안하는디
  $todoApps.addEventListener('keyup', todoInput);
};

todo();
