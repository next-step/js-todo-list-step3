import { Dispatcher } from "./Dispatcher";

export class TodoDispatcher extends Dispatcher{
    
    handleViewAction(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
    //현 예제에서는 필요 없음. 어떨때 필요한지 고민 필요.
    handleServerAction(action){
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    }
    
}