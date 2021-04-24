import { Action } from '../../action/Action.js'
import { $ } from "../../util/domSelection.js";

export class UserList{
    constructor(){
        const $todoApps = $('.todoapp-list-container')
        const $addMemberButton = $('#add-user-button')
        $addMemberButton.addEventListener('click', () => {
            const memberName = prompt('새로운 팀원 이름을 입력해주세요');
            Action.addMember($todoApps.dataset.teamid,memberName);
        })
    }

    render(team){
        //Title 설정
        $('#kanban-title strong').textContent = team.name;
        //teamId 세팅
        $('ul.todoapp-list-container').dataset.teamid=team._id;
        
        //멤버별 todoapp Container 생성 -> 이후 처리는 TodoStore에서 할 예정
        const members = team.members;
        const addMemberContainer = $('li.add-user-button-container');
        members.forEach((member) => {
            const todoAppContainer = `<li class="todoapp-container" data-memberid="${member._id}">${member.name}</li>`
            addMemberContainer.insertAdjacentHTML('beforebegin',todoAppContainer);
        });
    }
}
