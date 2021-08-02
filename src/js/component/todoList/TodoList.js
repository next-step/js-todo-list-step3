import Observer from "../../core/observer.js";
import { PRIORITY } from "../../constants/constants.js"
import { $, $$ } from "../../util/util.js";
import { teamAPI, memberAPI } from "../../api/api.js";

export class TodoList extends Observer{
    constructor(todolistState, filterState){
        super();
        this.todolistState = todolistState;
        this.filterState = filterState;
        const target = $("#user-title");
        this.teamID = target.dataset.id ;
        //console.log(this.teamID);
    }
    
     template(){      
        const todoList =  this.todolistState.getTodo();
        const filteredList = (() =>{
            const mode = this.filterState.get();
            console.log(mode);
            if(mode=='all'){
                return todoList;
            }
            if(mode=='active'){
                return todoList.filter(item => !item.isCompleted)
            }
            if(mode=='completed'){
                return todoList.filter(item => item.isCompleted)
            }
        })();
       console.log(filteredList);

        return `${filteredList.map(item =>`                
            <li class=${item.isCompleted?"completed":""}>
            <div class="view">
              <input id="${item._id}" class="toggle" type="checkbox" ${item.isCompleted?"checked":""} />
              <label id="${item._id}" class="label">
                ${this.getRanking(item.priority)}
                ${item.contents}
              </label>
              <button id="${item._id}" class="destroy"></button>
            </div>
            <input id="${item._id}" class="edit" value="${item.contents}" />
          </li>
            `).join('')}
        ` 
    }
     
    render(){
        const target = document.getElementById(this.todolistState.getMemberID());
        target.innerHTML = this.template();
        this.mounted();
    }

    mounted(){
        const toggleBtns = $$('.toggle');
        toggleBtns.forEach(Btn => Btn.addEventListener('click',this.onToggleTodo.bind(this)));
    
        const deleteBtns = $$('.destroy');
        deleteBtns.forEach(Btn => Btn.addEventListener('click', this.onDeleteTodo.bind(this)));
    
        const editBtns = $$('.label');
        editBtns.forEach(Btn =>  Btn.addEventListener('dblclick', this.onEditTodo.bind(this)));
    
        const editInputs = $$('.edit');
        editInputs.forEach(Btn => Btn.addEventListener('keydown', this.onEditKey.bind(this)));
    
        const selectedBoxs = $$('.select');
        selectedBoxs.forEach(Btn => Btn.addEventListener('click', this.onSelectPriority.bind(this)));
    }

    update(){
        this.render();
    }

    onEditTodo(e){
        e.stopPropagation();
        console.log(e.target);
        const _edit = $$('.todo-list > li');
        _edit.forEach((li) => {
            li.classList.remove('editing');
        });
        e.target.parentNode.parentNode.classList.add('editing');
    }
    async onSelectPriority(e){
        //e.stopPropagation();
        const selectedPriroty = {'priority' : e.target.value};
        if(selectedPriroty == PRIORITY.NONE) return;
        //console.log(e.target.parentNode.parentNode)
        const itemId = e.target.parentNode.parentNode.id;
        const memberId = this.todolistState.getMemberID();
        
        const response = await memberAPI.putTodoPriority(this.teamID, memberId,itemId, selectedPriroty);
        
        if(response.ok){
            const data = await memberAPI.getMemberTodoList(this.teamID, memberId);
           // this.todolistState.setTodo(data.todoList);
        }
    }

    async onEditKey(e){
        e.stopPropagation();
        if (e.key == 'Enter') {
           e.stopPropagation();
           const memberId = this.todolistState.getMemberID();
           const itemId = e.target.id;
           const newItem = {'contents': e.target.value};
           const response = await memberAPI.putMemberUpdateTodo(this.teamID, memberId,itemId, newItem)
           //(userId, itemId, {"contents": newItem});
            if(response.ok){
                const data = await memberAPI.getMemberTodoList(this.teamID, memberId);
                this.todolistState.setTodo(data.todoList);
           }
        }
        if (e.key == 'Escape') {
            e.target.parentNode.classList.remove('editing');
        }
    }


    async onToggleTodo(e){
        const memberId = this.todolistState.getMemberID();
        const itemId = e.target.id;

        await memberAPI.putMemberToggleTodo(this.teamID, memberId,itemId);
        const data = await memberAPI.getMemberTodoList(this.teamID, memberId);
        this.todolistState.setTodo(data.todoList);
    }

    async onDeleteTodo(e){
        const memberId = this.todolistState.getMemberID();
        const itemId = e.target.id;
        const response = await memberAPI.deleteMemberTodo(this.teamID, memberId,itemId);
        if(response.ok){
            const data = await memberAPI.getMemberTodoList(this.teamID, memberId);
            this.todolistState.setTodo(data.todoList);
        }
    }

    getRanking(priority){
        if(priority==PRIORITY.FIRST){
            return `
            <div class="chip-container">
              <span class="chip primary">1순위</span>
              <select class="chip select hidden">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            `
        }
        if(priority==PRIORITY.SECOND){
            return `
            <div class="chip-container">
              <span class="chip primary">2순위</span>
              <select class="chip select hidden">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            `
        }
        if(priority==PRIORITY.NONE){
            return `
            <div class="chip-container">
                <select  class="chip select">
                    <option value="NONE" selected>순위</option>
                    <option value="FIRST">1순위</option>
                    <option value="SECOND">2순위</option>
                </select>   
            </div>
            `
        }
    }
}