import {path} from "./constants/constants.js";
import {addTeam , getTeam,getTeamList} from "./service/TeamApi.js";
import {Observer} from "./core/Observer.js";
import TeamTitle from "./components/Team/TeamTitle.js";

export class App{

    constructor(currentPath) {

        console.log(currentPath , "path");
        switch (currentPath) {
            case path.INDEX_HTML:
                console.log('index.html');
                break;
            case path.KANBAN_HTML:
                console.log('kanban.html');
                break;
            default:
                console.log('kanban.html');
                break;
        }
    }

    initTeam(){
        this.Kanban = new TeamTitle();
        this.store = new TeamStore();
    }
    initTodo(){
        this.index ;
        this.store = new TodoStore();
    }
}
const initState = {
    filter : 'all',
    status: '',
    userList : [],
    todoList : [],
    selectedTeamId : null,
}