// import { TodoInput } from "./todoList/TodoInput.js";
// import { TodoFilter } from "./todoList/TodoFilter.js";
// import { TodoList } from "./todoList/TodoList.js";

import FilterState from "../store/filterState.js";
import TodoListState from "../store/todolistState.js";
import { TodoFilter } from "./todoList/TodoFilter.js";
import { TodoInput } from "./todoList/TodoInput.js";
import { TodoList } from "./todoList/TodoList.js";


export default class MemberTodoList{
  constructor(initData){ 
    this.filterState = new FilterState();
    this.todolistState = new TodoListState(initData._id);
    this.initData = initData;
    this.init();
  }

  async init(){
    //conponent
    this.todoInput  = new TodoInput(this.todolistState);
    this.todoList = new TodoList(this.todolistState, this.filterState);
    this.todoFilter =  new TodoFilter(this.todolistState, this.filterState);

    //subscribe
    this.filterState.subscribe(this.todoList);
    this.filterState.subscribe(this.todoFilter);

    this.todolistState.subscribe(this.todoList);
    this.todolistState.subscribe(this.todoFilter);

    // 초기데이터
    this.todolistState.setTodo(this.initData.todoList);

  }
}
