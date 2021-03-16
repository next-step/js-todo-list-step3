import { API } from '../API.js';

export const loadTeam = async teamID => {
    try{
        const res = await API.loadTeam(teamID);
        return res.json();
    } catch(err){
        console.error(err);
    }
}