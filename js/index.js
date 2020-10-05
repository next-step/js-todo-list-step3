import store from './store/index.js'

import TeamTitle from "./components/Team/TeamTitle.js";
import {getTeamList} from "./service/TeamApi.js";
import TodoTeamTitle from "./components/Todo/TodoTeamTitle.js";
import UserListContainer from "./components/Todo/UserListContainer.js";
import {getTeamToMemberToTodoList} from "./service/TodoApi.js";


const Team = async () => {
    const teamList = await getTeamList();
    store.dispatch('getTeamList', teamList);

    const teamInstance = new TeamTitle(document.querySelector('.team-list-container'));
    teamInstance.render();

}
const TodoList = async () => {
    const selectedTeamId = findGetParameter("name");
    if (!selectedTeamId) {
        alert('팀이 잘못 선택되었습니다.');
        location.history.back();
        return;
    }


    const teamList = await getTeamList();
    store.dispatch('getTeamList', teamList);
    store.dispatch('selectTeam', selectedTeamId);


    store.state.selectedTeam.members.forEach( async member => {
        const response = await getTeamToMemberToTodoList(store.state.selectedTeam._id,member._id);
        store.dispatch('getMemberTodoList', response);
    })

    const todoTeamTitleInstance = new TodoTeamTitle(document.querySelector('#user-title'));
    const todoListInstance = new UserListContainer(document.querySelector('.todoapp-list-container.flex-column-container'));
    todoTeamTitleInstance.render();
    todoListInstance.render();


}

const findGetParameter = (parameterName) => {
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
const init = () => {
    switch (location.pathname) {
        case '/kanban.html':
            TodoList();
            break;
        case '/index.html':
            Team();
            break;
        default :
            Team();
            break;
    }
}
init();