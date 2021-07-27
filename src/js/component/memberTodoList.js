// import { TodoInput } from "./todoList/TodoInput.js";
// import { TodoFilter } from "./todoList/TodoFilter.js";
// import { TodoList } from "./todoList/TodoList.js";

import FilterState from "../store/filterState.js";
import TodoListState from "../store/todolistState.js";


export default class MemberTodoList{
  constructor(){ 
      console.log("MemberTodoList");
      this.filterState = new FilterState;
      this.todolistState = new TodoListState;
      this.init();
  }

  // constructor(){
  //   this.selectedUserState = new SelectedUserState;
  //   this.userState = new UserState;
  //   this.filterState = new FilterState;
  //   this.init();
  // }

  async init(){
    
      //conponent
      // this.title = new Title(this.selectedUserState);
      // this.userList = new UserList(this.userState, this.selectedUserState);
      // //console.log(this.selectedUserState)
      // this.todoInput = new TodoInput(this.selectedUserState);
      // this.todoList = new TodoList(this.selectedUserState, this.filterState);
      // this.todoFilter = new TodoFilter(this.selectedUserState, this.filterState);
      // //subscribe

      // this.selectedUserState.subscribe(this.title);
      // this.selectedUserState.subscribe(this.userList);
      // this.selectedUserState.subscribe(this.todoFilter);
      // this.selectedUserState.subscribe(this.todoList);


      // this.userState.subscribe(this.userList);
      // this.filterState.subscribe(this.todoList);
      // this.filterState.subscribe(this.todoFilter);

      // //this.countState.subscribe(this.todoFilter);
      // //초기데이터
      // const initData = await userAPI.getAllUser();
      // this.userState.set(initData);
      // this.selectedUserState.set(initData[0]);

  }
}
