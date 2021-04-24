import { DAO } from "../database/database.js";
import { TodoItem , TodoStatusContainer} from "../component/todo/Todo.js";

/* PRIVATE 함수로 상태 변경. => ACTION을 통해서만 가능
async getUsers(){
  return await DAO.getUsers();
}

async changeUser(userId){
  await this.init(userId);
}

async addUser(userName){
  const addedUser = await DAO.addUser(userName);
  this.userListArray = await this.getUsers();//userList 업데이트를 위함.
  await this.init(addedUser._id);
}

async deleteUser(userId){
  const deletedUser = await DAO.deleteUser(userId);
  this.init();
}

async refreshUserItems(userId){
  const userItems = await DAO.getUserItems(userId);
  this.todoItemArray = userItems.map(item => new TodoItem(item));
  this.setState();
}
async addItem(data) {
  if (!data || data.trim().length < 2 ){
    alert('할일을 최소 2자 이상으로 입력해 주세요.')
    return;
  } 
  await DAO.addItem(this.currentUser._id,data);
  await this.refreshUserItems(this.currentUser._id);
}
async deleteItem(itemId) {
  await DAO.deleteItem(this.currentUser._id, itemId);
  await this.refreshUserItems(this.currentUser._id);
}

async deleteItemAll() {
  await DAO.deleteItemAll(this.currentUser._id);
  await this.refreshUserItems(this.currentUser._id);
}

async updateItem(itemId, data) {
  await DAO.updateItem(this.currentUser._id, itemId, data);
  await this.refreshUserItems(this.currentUser._id);
}
async updateItemState(itemId) {
  await DAO.updateItemState(this.currentUser._id, itemId);
  await this.refreshUserItems(this.currentUser._id);
}
async updateItemPriority(itemId,priority) {
  const priorityArray = [TodoItem.PRIORITY_NONE,TodoItem.PRIORITY_FIRST,TodoItem.PRIORITY_SECOND];
  await DAO.updateItemPriority(this.currentUser._id, itemId,priorityArray[priority]);
  await this.refreshUserItems(this.currentUser._id);
}
changeFilter(filterState) {
  if(Object.values(TodoStatusContainer.FILTER_STATE).find(value => value ==filterState)) {
    
    this.filterState = filterState;
    this.setState();
  }
}
*/

//팀원 목록을 불러 온 후 팀원 수만큼 인스턴스 생성필요.
export class TodoStore {
  //addUser시 사용됨.
  static async addUserTodoStoreFactory(){
    //Pseudo 
    //const team = addUserInTeam();
    //const newUser = newMembers-oldMemebers
    return new TodoStore(team._id, newUser._id);
  }
  //userId 필수
  async init(userId) {
    const items = await DAO.getUserItems(userId);
    this._state.todoItems =  items.map(item => new TodoItem(item));
    this.filterState = TodoStatusContainer.FILTER_STATE.ALL;
  }

  constructor(teamId,userId){
    //직접 생성 막을 방법? 
    // private 인스턴스 필드로 만들방법?
    this.teamId=teamId;
    this.userId=userId;
    this._state = {

      todoItems:[],
      filterState : TodoStatusContainer.FILTER_STATE.ALL
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
