import { todoDispatcher } from '../dispatcher/TodoDispatcher.js'
import { ACTION_TYPES } from '../action/Action.js'
import { DAO } from "../database/database.js";

const _getTeam = async (teamId) => {
  return await DAO.getTeam(teamId);
}
const _addMember = async (teamId,memberName) => {
  return await DAO.addMember(teamId,memberName);
}
const _copyState = (kanbanStoreState) => {
  const copy ={};
  copy.team = {
    _id: kanbanStoreState.team._id,
    name: kanbanStoreState.team.name,
    members: [...kanbanStoreState.team.members],
  }
  return copy;
}

export class KanbanStore {
  //생성자가 마음에 들지 않음.
  constructor(teamId,kanbanApp){
    this.teamId = teamId;
    this._state = {
      team: {},
    }
    this.kanbanApp = kanbanApp;
    this.dispatcherIndex = todoDispatcher.register(this.setState,this);
  }
  
  async init(){
    this._state.team = await _getTeam(this.teamId);
    const copiedState = _copyState(this._state);
    this.kanbanApp.renderAll(copiedState);
  }
  
  async setState({action}) {
    //상태 변경
    const type = action?.type
    const teamId = action?.teamId
    //Action 적용 대상 식별
    if(teamId != this.teamId) {
      return true;
    }
    if(type == ACTION_TYPES.GET_TEAM){
      this._state.team = await _getTeam(this.teamId);
    }else if(type == ACTION_TYPES.ADD_MEMBER){
      const memberName = action?.memberName
      await _addMember(teamId,memberName);
      this._state.team = await _getTeam(this.teamId);
    }else{
      //알지 못하는 액션이 왔을때.
      return true;
    }

    //상태 복사 후 전파
    const copiedState = _copyState(this._state);
    this.kanbanApp.renderAll(copiedState);

    //dispatcher에서 resolve처리
    return true; 
  }
}
