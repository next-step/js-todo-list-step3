import { createStore } from '../core/redux';
import rootReducer from './module/index.js';

const store = createStore(rootReducer);
export {
  store,
};
