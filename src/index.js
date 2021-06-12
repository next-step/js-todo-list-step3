/* @jsx createElement */
import { createElement } from './lib/React';
import { createStore } from './lib/Redux';
import { render } from './lib/ReactDOM';
import logger from './lib/middlewares/logger';
import thunk from './lib/middlewares/thunk';
import rootReducer from './modules';
import App from './App';
import './style/style.css';
import { getTeams } from './modules/team/thunk';

// 스토어 생성
export const store = createStore(rootReducer, [thunk, logger]);

// 리스너
const listener = () => {
  const $root = document.querySelector('#root');
  while ($root.hasChildNodes()) {
    $root.removeChild($root.firstChild);
  }
  render(<App />, $root);
};

store.dispatch(getTeams());

// 리스너 등록
store.subscribe(listener);
render(<App />, document.querySelector('#root'));
