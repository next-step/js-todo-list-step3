import { combineReducers } from '../lib/Redux';
import team from './team/reducer';
import member from './member/reducer';

const rootReducer = combineReducers({ team, member });

export default rootReducer;
