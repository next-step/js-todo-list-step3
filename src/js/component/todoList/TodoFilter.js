import Observer from "../../core/observer.js";
import { $, $$ } from "../../util/util.js";
import { FILTER } from "../../constants/constants.js";
import { teamAPI, memberAPI } from "../../api/api.js";

export class TodoFilter extends Observer{
    constructor(todolistState, filterState){
        super();
        this.todolistState = todolistState;
        this.filterState = filterState;
        const target = $("#user-title");
        this.teamID = target.dataset.id ;
    }
    templete(){
        const filter = this.filterState.get();
        const todo = this.todolistState.getTodo();
        const count = this.countTotalTodo(filter, todo);
        return `
        <span class="todo-count">총 <strong>${count}</strong> 개</span>
        <ul class="filters">
          <li class="li-filter">
            <a href="#" class="all ${filter =="all"?"selected":""}">전체보기</a>
          </li>
          <li>
            <a href="#priority">우선 순위</a>
          </li>
          <li class="li-filter">
            <a href="#active" class="active ${filter =="active"?"selected":""}">해야할 일</a>
          </li>
          <li class="li-filter">
            <a href="#completed" class="completed  ${filter =="completed"?"selected":""}">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed" id="deleteAll${this.todolistState.getMemberID()}">모두 삭제</button>
        
        `
    } 
    render(){
        const target = document.getElementById(`filter${this.todolistState.getMemberID()}`);
        target.innerHTML = this.templete();
        this.mounted();
    }
    mounted(){
        const filterBtn = $$('.li-filter');
        filterBtn.forEach(btn => btn.addEventListener('click',this.onFilterChange.bind(this)));
    
        const deleteAllBtn = document.getElementById(`deleteAll${this.todolistState.getMemberID()}`);
        deleteAllBtn.addEventListener('click', this.onDeleteAllTodo.bind(this));
    }
    update(){
        this.render();
    }
    async onDeleteAllTodo(){
        const memberID = this.todolistState.getMemberID();
        const response = await memberAPI.deleteTodoAll(this.teamID, memberID)
        
        if(response.ok){
          const data = await memberAPI.getMemberTodoList(this.teamID, memberID);
          this.todolistState.setTodo([]);
        }
    }
    onFilterChange(e){  
        const mode= e.target.className.replace('selected','').trim();
        this.filterState.set(mode);
    }
    countTotalTodo(filter, todo){
        if(filter ==FILTER.ALL){
            return todo.length;
        }

        if(filter == FILTER.ACTIVE){
            return todo.filter(item => !item.isCompleted).length
        }
        if(filter == FILTER.COMPLETED){
            return todo.filter(item => item.isCompleted).length
        }
    }
}