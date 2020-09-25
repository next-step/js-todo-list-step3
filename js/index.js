import store from './store/index.js'

import TeamTitle from "./components/Team/TeamTitle.js";
import {getTeamList} from "./service/TeamApi.js";
import TodoTeamTitle from "./components/Todo/TodoTeamTitle.js";
import TodoListContainer from "./components/Todo/TodoListContainer.js";
import UserTitle from "./components/Todo/UserTitle.js";


const Team = async ()=>{
    const teamList = await getTeamList();
    store.dispatch('getTeamList', teamList);

    const teamInstance = new TeamTitle();
    teamInstance.render();

}
const TodoList = async  () =>{
    const selectedTeamId = findGetParameter("name");
    if(!selectedTeamId){
        alert('팀이 잘못 선택되었습니다.');
        location.history.back();
        return;
    }

    const teamList = await getTeamList();
    store.dispatch('getTeamList', teamList);
    store.dispatch('selectTeam', selectedTeamId);
    const todoTeamTitleInstance = new TodoTeamTitle();
    const todoListInstance = new TodoListContainer();
    todoTeamTitleInstance.render();
    todoListInstance.render();


}

const findGetParameter = (parameterName) =>{
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
const init =() => {
    switch (location.pathname) {
        case '/kanban.html':
            console.log('kanban');
            TodoList();
            break;
        case '/index.html':
            console.log('index');
            Team();
            break;
        default :
            console.log('default');
            Team();
            break;
    }
}
init();