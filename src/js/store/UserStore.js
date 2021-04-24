//꼭 필요한건지 아직 모르겠음. 쓰면 kanban화면 로드 할때나 user 추가할때 써도 될듯함.
export class UserStore {
 
  constructor(){
    this._state = {
    }
    this.dispatcherIndex = TodoDispatcher.register(this.setState);
  }
  
  setState() {
    //PSEUDO 
    /*
    switch(action){
      case :
        DO CHANGE STATE WITH Store's METHOD!

      default :
        NOT MY ACTION.. 
    }
    &&
    todoApp.render(need_state)
    */
  }
}
