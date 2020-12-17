import { createStore } from '../core/redux';
import rootReducer from './module';

const store = createStore(rootReducer);
export {
  store,
};
