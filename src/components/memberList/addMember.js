import {API} from '../../api/api.js';
import {getTeamId} from '../../utils/localStorage.js';
import {loadMembers} from './loadMembers.js';
export const MIN_MEMBER_NAME = 2;

export const onAddMember = async({target}) => {
    if(!target.classList.contains('material-icons')) return;
    
    const memberName= prompt('이름을 입력해주세요');
    if(!memberName) return;
    if(memberName.length < MIN_MEMBER_NAME) return alert(`이름은 ${MIN_MEMBER_NAME}자 이상 입력해주세요`);

    await API.addMemer(getTeamId(), memberName);
    loadMembers();

}
