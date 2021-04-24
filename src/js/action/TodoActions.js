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

   static getTeam(teamId){
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.GET_TEAM,
      teamId:teamId,
    });
   }

   static addMember(teamId,memberName){
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.ADD_MEMBER,
      teamId:teamId,
      memberName:memberName,
    });
   }

   static deleteItemAll(teamId,userId){
    todoDispatcher.handleViewAction({
      type: ACTION_TYPES.DELETE_ITEM_ALL,
      teamId:teamId,
      userId:userId,
    });
   }

  };