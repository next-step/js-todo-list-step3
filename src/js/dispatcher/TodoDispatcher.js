import { Dispatcher } from "./Dispatcher.js";

class TodoDispatcher extends Dispatcher{
    
    handleViewAction(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}
export const todoDispatcher = new TodoDispatcher();