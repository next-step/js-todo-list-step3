import { API } from './API.js';

export const loadTodoList = async (team, user) => {
    try{
        const res = await API.loadTodoList(team, user);
        return res.json();
    } catch(err){
        console.error(err);
    }
}