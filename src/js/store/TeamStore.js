import { todoDispatcher } from '../dispatcher/TodoDispatcher.js'
import { ACTION_TYPES } from '../action/Action.js'
import { DAO } from "../database/database.js";

const _getTeams = async () =>{
  return await DAO.getTeams();
}

const _addTeam = async (teamName) =>{
  return await DAO.addTeam(teamName);
}

const _copyState = (teamStoreState) => {
  const copy ={
    teams: [...teamStoreState.teams],
  }
  return copy;
}

export class TeamStore {
  constructor(teamApp){
    this._state = {
      teams:[],
    }
    this.teamApp = teamApp;
    this.dispatcherIndex = todoDispatcher.register(this.setState,this);
  }
  async init(){
    this._state.teams = await _getTeams();
    const copiedState = _copyState(this._state);
    this.teamApp.renderAll(copiedState);
  }
  async setState({action}) {
    //상태 변경
    const type = action?.type
    if(type == ACTION_TYPES.GET_TEAMS){
      this._state.teams = await _getTeams();
    }else if(type == ACTION_TYPES.ADD_TEAM){
      await _addTeam(action?.teamName);
      this._state.teams = await _getTeams();
    }else{
      //알지 못하는 액션이 왔을때.
      return true;
    }

    //상태 복사 후 전파
    const copiedState = _copyState(this._state);
    this.teamApp.renderAll(copiedState);

    //dispatcher에서 resolve처리
    return true; 
  }
}
