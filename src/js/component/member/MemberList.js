import { Action } from '../../action/Action.js';
import { $ } from '../../util/domSelection.js';

const $todoApps = $('ul.todoapp-list-container');
const _addTeamMemberEvent = ({ target }) => {
  if (!target) return;
  if (target.classList.contains('add-user-button')) {
    const memberName = prompt('새로운 팀원 이름을 입력해주세요');
    if (memberName) {
      Action.addMember($todoApps.dataset.teamid, memberName);
    }
  }
};
export class MemberList {
  constructor() {
    //Rendering전에 수행되어야 할 작업들
    $todoApps.addEventListener('click', _addTeamMemberEvent);
  }

  render(member) {
    //멤버별 todoapp Container 생성 -> 이후 처리는 TodoStore에서 할 예정
    const addMemberContainer = $('li.add-user-button-container');
    const todoAppContainer = `<li class="todoapp-container" data-memberid="${member._id}">
            <h2>
                <span><strong>${member.name}</strong>'s Todo List</span>
            </h2>
        </li>`;
    addMemberContainer.insertAdjacentHTML('beforebegin', todoAppContainer);
  }
}
