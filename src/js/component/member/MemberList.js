import { Action } from '../../action/Action.js'
import { $ } from "../../util/domSelection.js"

export class MemberList{
    constructor(){
        const $todoApps = $('ul.todoapp-list-container')
        $todoApps.addEventListener('click', ({target}) => {
            if(!target) return;
            if(target.classList.contains('add-user-button') ){
                const memberName = prompt('새로운 팀원 이름을 입력해주세요');
                if(memberName){
                    Action.addMember($todoApps.dataset.teamid,memberName);
                }
            }
        })
    }

    render(member){
        //멤버별 todoapp Container 생성 -> 이후 처리는 TodoStore에서 할 예정
        const addMemberContainer = $('li.add-user-button-container');
        const todoAppContainer = 
        `<li class="todoapp-container" data-memberid="${member._id}">
            <h2>
                <span><strong>${member.name}</strong>'s Todo List</span>
            </h2>
        </li>`
        addMemberContainer.insertAdjacentHTML('beforebegin',todoAppContainer);
    }
}
