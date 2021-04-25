import { todoDispatcher } from '../dispatcher/TodoDispatcher.js'
import { ACTION_TYPES } from '../action/Action.js'
import { DAO } from "../database/database.js"
import { TodoStatusContainer } from '../component/todo/TodoStatusContainer.js'
import { TodoItem } from '../vo/TodoItem.js'

const _getMemberTodoList = async (teamId,memberId) => {
  return await DAO.getMemberTodoList(teamId,memberId);
}

const _updateMemberTodoList = (_id,todoList) => {
  _stateMap.get(_id).todoList = todoList;
}
const _updateMemberFilterState = (_id,filterState) => {
  _stateMap.get(_id).filterState = filterState;
}
const _updateMemberState = (_id,newStateObj) => {
  _stateMap.set(_id,newStateObj);
}

      
const _refreshMemberTodoList = async (teamId,memberId) => {
  const {_id,todoList = []} = await _getMemberTodoList(teamId,memberId);
  _updateMemberTodoList(_id,todoList);
}



const _addItem = async (teamId, memberId, data) => {
  if (!data || data.trim().length < 2) {
    alert("할일을 최소 2자 이상으로 입력해 주세요.");
    return;
  }
  return await DAO.addItem(teamId, memberId, data);
};

const _deleteItem = async (teamId,memberId,itemId) => {
  return await DAO.deleteItem(teamId,memberId,itemId);
}
const _deleteItemAll = async (teamId,memberId) => {
  return await DAO.deleteItemAll(teamId,memberId);
}
const _updateItemCompleteToggle = async (teamId,memberId,itemId) => {
  return await DAO.updateItemCompleteToggle(teamId,memberId,itemId);
}
const _updateItem = async (teamId,memberId,itemId,data) => {
  return await DAO.updateItem(teamId,memberId,itemId,data);
}
const _updateItemPriority = async (teamId,memberId,itemId,priority) => {
  const priorityArray = [TodoItem.PRIORITY_NONE,TodoItem.PRIORITY_FIRST,TodoItem.PRIORITY_SECOND];
  return await DAO.updateItemPriority(teamId,memberId,itemId,priorityArray[priority]);
}

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

    action = action.action;
    const type = action?.type
    const teamId = action?.teamId
    const memberId = action?.memberId
    const itemId = action?.itemId;

    if(type == ACTION_TYPES.ADD_MEMBER){
      addedMemberId = this.kanbanStore.getLastAddedMember()._id;
      const {_id,todoList = []} = await _getMemberTodoList(teamId,addedMemberId);
      _updateMemberState(_id,{todoList:todoList,filterState:TodoStatusContainer.FILTER_STATE.ALL});  
    }else if(type == ACTION_TYPES.ADD_ITEM){
      const data = action?.data;
      await _addItem(teamId,memberId,data);
      await _refreshMemberTodoList(teamId,memberId);
    }else if(type == ACTION_TYPES.DELETE_ITEM){
      await _deleteItem(teamId,memberId,itemId);
      await _refreshMemberTodoList(teamId,memberId);
    }else if(type == ACTION_TYPES.DELETE_ITEM_ALL){
      await _deleteItemAll(teamId,memberId);
      await _refreshMemberTodoList(teamId,memberId);
    }else if(type == ACTION_TYPES.UPDATE_ITEM_COMPLETE_TOGGLE){
      await _updateItemCompleteToggle(teamId,memberId,itemId);
      await _refreshMemberTodoList(teamId,memberId);
    }else if(type == ACTION_TYPES.UPDATE_ITEM){
      const data = action?.data;
      await _updateItem(teamId,memberId,itemId,data);
      await _refreshMemberTodoList(teamId,memberId);
    }else if(type == ACTION_TYPES.UPDATE_ITEM_PRIORITY){
      const priority = action?.priority;
      await _updateItemPriority(teamId,memberId,itemId,priority);
      await _refreshMemberTodoList(teamId,memberId);
    }else if(type == ACTION_TYPES.CHANGE_FILTER_STATE){
      const filterState = action?.filterState;
      await _updateMemberFilterState(memberId,filterState);
    }else{
      return true;
    }
    
    const copiedState = this.getMemberState(memberId);
    this.todoApp.renderAll(copiedState);
    return true; 
  }
}
