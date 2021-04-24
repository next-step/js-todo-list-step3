import { todoDispatcher } from '../dispatcher/TodoDispatcher.js'; 
import { ACTION_TYPES } from './Action.js'
export class TodoActions{
   static getTeams(){
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.GET_TEAMS,
    });
   }

   static addTeam(teamName){
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.ADD_TEAM,
      teamName:teamName,
    });
   }
  };