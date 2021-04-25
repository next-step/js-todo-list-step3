import { todoDispatcher } from '../dispatcher/TodoDispatcher.js'
import { ACTION_TYPES } from '../action/Action.js'
import { DAO } from "../database/database.js"
import { TodoStatusContainer } from '../component/todo/TodoStatusContainer.js'
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


const _stateMap = new Map();

export class TodoStore {
  async init() {
    const teamId = this.kanbanStore.getTeamId();
    const members = this.kanbanStore.getMembers();

    members.forEach(async(member) =>{
      const {_id,todoList = []} = await DAO.getMemberTodoList(teamId,member._id);
      _stateMap.set(_id,{todoList:todoList,filterState:TodoStatusContainer.FILTER_STATE.ALL});
      this.todoApp.renderAll(this.getMemberState(_id));
    });
  }

  constructor(kanbanStore,todoApp){
    this.kanbanStore = kanbanStore;
    this.todoApp = todoApp;
    this.dispatcherIndex = todoDispatcher.register(this.setState,this);
  }
  getMemberState= (memberId) => {
    const memberState = _stateMap.get(memberId);
    const copy = {
      memberId:memberId,
      todoList : [...memberState.todoList],
      filterState : memberState.filterState
    };
    return copy;
  }

  async setState(action) {
    if(_stateMap.keys().length == 0) {
      new Error("Invalid state. May be the store isn't initiated");
    }
    //action에서 명시된 멤버의 상태값만 뷰로 넘기면 된다.
    //상태 변경
    action = action.action;
    const type = action?.type
    const teamId = action?.teamId
    let memberId = action?.memberId
    
    if(type == ACTION_TYPES.ADD_ITEM){
      const data = action?.data;
      await DAO.addItem(teamId,memberId,data);
      const {_id,todoList = []} = await DAO.getMemberTodoList(teamId,memberId);
      _stateMap.get(_id).todoList = todoList;
    }else if(type == ACTION_TYPES.ADD_MEMBER){
      memberId=this.kanbanStore.getLastAddedMember()._id;
      const {_id,todoList = []} = await DAO.getMemberTodoList(teamId,memberId);
      _stateMap.set(_id,{todoList:todoList,filterState:TodoStatusContainer.FILTER_STATE.ALL});
    }else{
      //모르는 Action일 경우 넘김.
      return true;
    }

    //상태 복사 후 전파
    const copiedState = this.getMemberState(memberId);
    this.todoApp.renderAll(copiedState);

    //dispatcher에서 resolve처리
    return true; 
  }
}
