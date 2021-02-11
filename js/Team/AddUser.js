import { userTemplate } from '../Template.js';
import { API } from '../API.js';
import { team, getTeam } from './Team.js';

const $addUserButton = document.querySelector('#add-user-button');

$addUserButton.addEventListener('click', () => addUser());

export const addUser = async () => {
    const username = prompt('새로운 팀원 이름을 입력해주세요');
    if(username === null){
        return;
    }
    if(username.length < 2){
        alert('이름이 너무 짧습니다.');
        return;
    }

    const user = userTemplate;
    user.name = username;

    try{
        await API.addMember(team._id, user);
        getTeam();
    } catch(err){
        console.error(err);
    }
}