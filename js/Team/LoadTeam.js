import { API } from '../API.js';

export const loadTeam = async team => {
    try{
        const res = await API.loadTeam(team);
        return res.json();
    } catch(err){
        console.error(err);
    }
}