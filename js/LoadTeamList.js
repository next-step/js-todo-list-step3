import { API } from './API.js';

export const loadTeamList = async () => {
    try{
        const res = await API.loadTeamList();
        return res.json();
    } catch(err){
        console.error(err);
    }
}