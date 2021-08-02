import Observer from "../../core/observer.js";
import { FILTER, PRIORITY } from "../../constants/constants.js"
import { $, $$ } from "../../util/util.js";
import { teamAPI, memberAPI } from "../../api/api.js";

export class TodoList extends Observer{
    constructor(todolistState, filterState){
        super();
        this.todolistState = todolistState;
        this.filterState = filterState;
        const target = $("#user-title");
        this.teamID = target.dataset.id ;
    }
    
     template(){      
        const todoList =  this.todolistState.getTodo();
        const filteredList = (() =>{
            const mode = this.filterState.get();
            
            if(mode=='all'){
                return todoList;
            }
            if(mode=='active'){
                return todoList.filter(item => !item.isCompleted)
            }
            if(mode=='completed'){
                return todoList.filter(item => item.isCompleted)
            }
            if(mode=='ranking'){
                let sortedArr = todoList.sort(function(a,b){
                    if(a.priority=="NONE") a.priority=0;
                    if(a.priority=="FIRST") a.priority=2;
                    if(a.priority=="SECOND") a.priority=1;
                    if(b.priority=="NONE") b.priority=0;
                    if(b.priority=="FIRST") b.priority=2;
                    if(b.priority=="SECOND") b.priority=1;
                    return b.priority -a.priority;
                });
                return sortedArr;
            }
        })();

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
        selectedBoxs.forEach(Btn => {
            if(Btn.dataset.id==this.todolistState.getMemberID()){
                console.log("ddddd");
                Btn.addEventListener('change', this.onSelectPriority.bind(this));
            }
        })
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
        e.stopPropagation();
        
        let option ='';
        if(e.target.value =='1') option = "FIRST";
        if(e.target.value =='2') option ="SECOND";
        if(e.target.value =='0') option ="NONE";

        const selectedPriroty = {'priority' : option};
        
        const itemId = e.target.parentNode.parentNode.id;
        const memberId = this.todolistState.getMemberID();
        const response = await memberAPI.putTodoPriority(this.teamID, memberId,itemId, selectedPriroty);
        
        if(response.ok){
            const data = await memberAPI.getMemberTodoList(this.teamID, memberId);
            this.todolistState.setTodo(data.todoList);
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
        if(priority==PRIORITY.FIRST||priority==2){
            return `
            <div class="chip-container">
              <select class="chip select primary" data-id=${this.todolistState.getMemberID()}>
                <option value="0" >순위</option>
                <option value="1" selected>1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            `
        }
        if(priority==PRIORITY.SECOND||priority==1){
            return `
            <div class="chip-container">
              <select class="chip select secondary" data-id=${this.todolistState.getMemberID()}>
                <option value="0">순위</option>
                <option value="1">1순위</option>
                <option value="2" selected>2순위</option>
              </select>
            </div>
            `
        }
        if(priority==PRIORITY.NONE||priority==0){
            return `
            <div class="chip-container">
                <select  class="chip select" data-id=${this.todolistState.getMemberID()}>
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                </select>   
            </div>
            `
        }
    }
}