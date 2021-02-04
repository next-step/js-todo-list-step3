import { API } from "./API.js";
import { getTeamList, $todoApps, teamId } from "./ShowTodoList.js"



export const initUpdateTodoList = () => {
    $todoApps.addEventListener("keyup", updateItem);
}

const updateItem = async ({target, key}) => {
    if(!target.classList.contains('edit')) return;
    if(key !== "Enter") return;
    const str = target.value;
    console.log(target, str);
    // if(str.length <MINIMUN_INPUT_LENGTH){
    //     alert(`${MINIMUN_INPUT_LENGTH}글자 이상 입력해주세요!`);
    //     return;
    // }
    // const memberId = target.closest('li').getAttribute('id');
    
    // await API.postItem(teamId, memberId, str);
    // getTeamList();
};