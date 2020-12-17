import { store } from './store';
import App from '../App.js';
import {increament} from "./store/module/counter";

store.subscribe(() => {});

const hello1 = (action) => {
  console.log('api 통신');
  return store.dispatch(action);
};
// store.dispatch(increament1);

hello1(increament);
// store.dispatch(increament);

const hello = store.getState();

console.log(hello);
