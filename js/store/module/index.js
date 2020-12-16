import counter from './counter.js';
import { combineReducers } from '../../core/redux';
import hello from './counter2.js';

export default combineReducers({
  counter,
  hello,
});
