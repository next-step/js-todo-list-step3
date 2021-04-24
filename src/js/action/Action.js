import { TodoActions as action } from './TodoActions.js'; 
export const ACTION_TYPES = {
    GET_TEAMS : 'GET_TEAMS',
    ADD_TEAM :'ADD_TEAM',

    GET_USERS : 'GET_USERS',
    ADD_USER :'ADD_USER',

    GET_ITEMS :'ADD_USER',
    ADD_ITEM :'ADD_USER',
    UPDATE_ITEM : 'UPDATE_ITEM',
    UPDATE_ITEM_COMPLETE_TOGGLE : 'UPDATE_ITEM_COMPLETE_TOGGLE',
    UPDATE_ITEM_PRIORITY : 'UPDATE_ITEM_PRIORITY',
    DELETE_ITEM : 'DELETE_ITEM',
    DELETE_ITEM_ALL : 'DELETE_ITEM_ALL',
    
    CHANGE_FILTER : 'CHANGE_FILTER',
}

//interface
export class Action{
    static getTeams(){
        action.getTeams();
    }

    static addTeam(teamName){
        action.addTeam(teamName);
    }
}