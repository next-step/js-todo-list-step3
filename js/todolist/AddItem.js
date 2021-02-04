import { MINIMUN_INPUT_LENGTH } from "../index.js";
import { API } from "../API.js";
import { getTeamList, $todoApps, teamId } from "./ShowTodoList.js"


export const initAddTodoList = () => {
    $todoApps.addEventListener("keyup", addItem);
}

const addItem = async ({target, key}) => {
    if(!target.classList.contains('new-todo')) return;
    if(key !== "Enter") return;
    const str = target.value;
    target.value = '';
    console.log(str);
    if(str.length <MINIMUN_INPUT_LENGTH){
        alert(`${MINIMUN_INPUT_LENGTH}글자 이상 입력해주세요!`);
        return;
    }
    const memberId = target.closest('li').getAttribute('id');
    
    await API.postItem(teamId, memberId, str);
    getTeamList();
};

