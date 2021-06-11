/* @jsx createElement */
import { createElement } from './lib/React';
import { createStore } from './lib/Redux';
import { render } from './lib/ReactDOM';
import logger from './lib/middlewares/logger';
import thunk from './lib/middlewares/thunk';
import rootReducer from './modules';
import App from './App';
import './style/style.css';

// 스토어 생성
export const store = createStore(rootReducer, [thunk, logger]);

// 리스너
const listener = () => {
  const $root = document.querySelector('#root');
  if ($root.firstElementChild) {
    document.querySelector('#root').removeChild($root.firstElementChild);
  }
  render(<App />, $root);
};

// 리스너 등록
store.subscribe(listener);
render(<App />, document.querySelector('#root'));
