import { combineReducers } from '../../lib/reducs';
import todo from './todo';
import user from './user';
import team from './team';

const rootReducer = combineReducers({ todo, user, team });

export default rootReducer;
