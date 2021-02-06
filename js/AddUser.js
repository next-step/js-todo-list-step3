import { userTemplate } from './template.js';
import { API } from './API.js';

const $addUserButton = document.querySelector('#add-user-button');

$addUserButton.addEventListener('click', addUser)

export const addUser = async team => {
    const username = prompt('새로운 팀원 이름을 입력해주세요');

    const user = userTemplate;
    user._id = Math.random().toString(36).substr(2,10);
    user.name = username;

    try{
        await API.addMember(team, user);
    } catch(err){
        console.error(err);
    }
}