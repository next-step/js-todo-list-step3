import { API } from '../API.js';

export const loadTodoList = async (teamID, userID) => {
    try{
        const res = await API.loadTodoList(teamID, userID);
        return res.json();
    } catch(err){
        console.error(err);
    }
}