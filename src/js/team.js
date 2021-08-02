import {TeamList} from './component/team/teamList.js'
import TeamState from './store/teamState.js'
import { teamAPI } from './api/api.js';

export default class Team{
  constructor(){
    this.teamState = new TeamState;
    this.init();
  }
  async init(){
    this.TeamList = new TeamList(this.teamState);
    this.teamState.subscribe(this.TeamList);

    const initdata = await teamAPI.getTeam();
    
    this.teamState.set(initdata);
  }
}


new Team();