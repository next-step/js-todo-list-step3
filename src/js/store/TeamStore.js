
//첫 화면에서 사용할 것임..
export class TeamStore {
  constructor(){
    this._state = {
      teams:[],
    }
    this.dispatcherIndex = TodoDispatcher.register(this.setState);
  }
  
  setState() {
    //PSEUDO 
    /*
    switch(action){
      case : GET_TEAMS
        DO CHANGE STATE WITH Store's METHOD!

      case : ADD_TEAM
      
      default :
        NOT MY ACTION.. 
    }
    &&
    todoApp.render(need_state)
    */
  }
}
